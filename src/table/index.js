import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import TableHeader from './table_header';
import $ from 'jquery';

const {Table, Column, Cell} = FixedDataTable;
import {HeaderCell} from './cells'

const TableHolderComponent = React.createClass({
    propTypes: {
        //The data for the rows
        data: React.PropTypes.array.isRequired,

        //The current columns that should be rendered.
        columns: React.PropTypes.array.isRequired,

        //All the filters for the columns. Indexed by column key.
        columnFilters: React.PropTypes.object,

        //The current selected filters
        currentFilters: React.PropTypes.array,

        //All the columns that the user can pick between.
        allColumnsThatCouldBeRendered: React.PropTypes.array,
        onColumnChange: React.PropTypes.func,

        //Width and height of table
        width: React.PropTypes.oneOfType([
            React.PropTypes.oneOf(['auto']),
            React.PropTypes.number,
        ]),
        height: React.PropTypes.number,

        rowHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,

        //Trigger functions that haven't already been listed.
        onSearch: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        onSort: React.PropTypes.func,
        onReachedBottom: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            data: [],
            columns: [],
            columnFilters: {},
            allColumnsThatCouldBeRendered: [],

            //Change these to what we'll probably use in prod.
            width: 'auto',
            height: 500,
            rowHeight: 40,
            headerHeight: 40,
        };
    },
    getInitialState() {
        const avgColWidth = this._getAvgColWidth();
        return {
            columnWidths: _(this.props.columns).map(() => avgColWidth),
            tableWidth: 1000,
        }
    },
    componentDidMount() {
        if (this.props.width === 'auto') {
            this._setDynamicWidthOnTable();
            $(window).on('resize', this._setDynamicWidthOnTable);
        }
    },
    _setDynamicWidthOnTable() {
        const mapToScale = (x, inMax, outMax) => (x * outMax / inMax);
        const width = $(this.refs.holder).width();
        const inMax = _(this.state.columnWidths).reduce((memo, val) => memo + val, 0);
        const diff = width - (this.state && this.state.tableWidth ? this.state.tableWidth : 1000);
        const newColumnWidths = _(this.state.columnWidths).map((val) => {
            return mapToScale(val, inMax, inMax + diff);
        });

        this.setState({
            tableWidth: width,
            columnWidths: newColumnWidths,
        });
    },
    componentWillUnmount() {
        $(window).off('resize', this._setDynamicWidthOnTable);
    },
    componentWillReceiveProps(nextProps, nextState) {
        const mapToScale = (x, inMax, outMax) => (x * outMax / inMax);

        if (nextProps.columns.length !== this.props.columns.length) {
            const nextPropsMore = (nextProps.columns.length > this.props.columns.length);
            const diff = Math.abs(nextProps.columns.length - this.props.columns.length);
            const avgColWidth = nextPropsMore ? this._getAvgColWidth(nextProps) : this._getAvgColWidth(this.props);
            const inMax = _(this.state.columnWidths).reduce((memo, num) => memo + num, 0);
            let outMax;
            if (nextPropsMore) {
                outMax = inMax + ((this.props.columns.length - nextProps.columns.length) * avgColWidth);
            } else {
                outMax = inMax + ((nextProps.columns.length - this.props.columns.length) * avgColWidth);
            }

            const currentTableWidth = (this.props.width === 'auto') ? this.state.tableWidth : this.props.width;
            const nextTableWidth = (nextProps.width === 'auto') ? this.state.tableWidth : nextProps.width;
            const currentColumnWidths = _(this.state.columnWidths).map((val) => {
                if (nextPropsMore) {
                    //Add
                    return mapToScale(val, currentTableWidth, nextTableWidth - (diff * avgColWidth));
                } else {
                    //Remove
                    return mapToScale(val, currentTableWidth - (diff * avgColWidth), nextTableWidth)
                }
            });

            //Perhaps we should use a key?
            const newColumnWidths = _(nextProps.columns).map((val, index) => {
                if (currentColumnWidths[index]) {
                    return currentColumnWidths[index];
                }

                return this._getAvgColWidth(nextProps);
            })

            this.setState({
                columnWidths: newColumnWidths,
            });
        }
    },
    _onColumnResize(newWidth, dataKey) {
        let newColumns = this.state.columnWidths;
        const allOtherWidthsTogether = _(this.state.columnWidths)
                  .chain()
                  .filter((num, index) => index != dataKey)
                  .reduce((memo, num) => memo + num, 0)
                  .value();

        const maxWidth = this.props.width === 'auto' ? this.state.tableWidth : this.props.width;
        newColumns[dataKey] = Math.max(40, Math.min(maxWidth - allOtherWidthsTogether, newWidth));
        this.setState({columnWidths: newColumns});
    },
    _justifyColumns() {
        const avgWidth = this._getAvgColWidth(this.props);
        const newColumns = _(this.props.columns).map(() => avgWidth);
        this.setState({columnWidths: newColumns});
    },
    _onSearchChange(val) {
        if (typeof this.props.onSearch === 'function') {
            this.props.onSearch(val);
        }
    },
    _onSort(props) {
        if (typeof this.props.onSort === 'function') {
            this.props.onSort(props.columnKey);
        }
    },
    _onColumnChange(newColumns) {
        if (typeof this.props.onColumnChange === 'function') {
            this.props.onColumnChange(newColumns);
        }
    },
    _onScrollEnd(x, y) {
        //onReachedBottom not a function, no need to do anything here then.
        if (typeof this.props.onReachedBottom !== 'function') return;

        const {rowHeight, data, height} = this.props;
        var triggerLimit = rowHeight * 20;
        var totalTableHeight = rowHeight * data.length - height;
        if (y > (totalTableHeight - triggerLimit)) {
            this.props.onReachedBottom();
        }

    },
    _getAvgColWidth(props = this.props) {
        const width = props.width === 'auto' ? (this.state && this.state.tableWidth || 1000) : props.width;
        return width / props.columns.length;
    },
    render() {
        const data = this.props.data;
        const columnsToRender = this.props.columns;

        let columnsEls= _(columnsToRender).map((val, index) => {
            return (
                <Column
                    columnKey={index}
                    header={(props) => {
                        const filters = this.props.columnFilters[val.val];
                        return <HeaderCell
                            onFilter={this.props.onFilter}
                            onSort={this._onSort}
                            availableFilters={filters}
                            currentFilters={this.props.currentFilters}
                            {...val}
                            {...props} />
                    }}
                    key={index}
                    id={`column-${index}`}
                    dataKey={index}
                    width={this.state.columnWidths[index]}
                    isResizable={true}
                    cell={(props) => {
                        return (
                            <div>
                                <i className='fa fa-clock-o' />
                                {data[props.rowIndex][val.val]}
                            </div>
                        )
                    }}
                />
            );
        });

        const props = this.props;
        let tableWidth = props.width;
        if (props.width === 'auto') {
            tableWidth = this.state.tableWidth;
        }

        return (
            <div ref='holder' className='bui-table-holder'>
                <TableHeader
                    onColumnChange={this._onColumnChange}
                    onSearchChange={this._onSearchChange}
                    allColumnsThatCouldBeRendered={props.allColumnsThatCouldBeRendered}
                    currentColumns={columnsToRender}
                    justifyColumns={this._justifyColumns}
                />
                <Table
                    isColumnResizing={false}
                    overflowX='hidden'
                    onColumnResizeEndCallback={this._onColumnResize}
                    onScrollEnd={this._onScrollEnd}
                    rowHeight={props.rowHeight}
                    rowsCount={props.data.length}
                    width={tableWidth}
                    height={props.height}
                    headerHeight={props.headerHeight}>
                    {columnsEls}
                </Table>
            </div>
        );
    }
});


export default TableHolderComponent;
