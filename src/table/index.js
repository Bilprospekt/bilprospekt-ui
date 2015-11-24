import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import TableHeader from './table_header';

const {Table, Column, Cell} = FixedDataTable;

const TableHolderComponent = React.createClass({
    propTypes: {
        //The data for the rows
        data: React.PropTypes.array.isRequired,

        //The current columns that should be rendered.
        columns: React.PropTypes.array.isRequired,

        //All the columns that the user can pick between.
        allColumnsThatCouldBeRendered: React.PropTypes.array,
        onColumnChange: React.PropTypes.func,

        //Width and height of table
        width: React.PropTypes.number,
        height: React.PropTypes.number,

        rowHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,

        //If we need to do async requests for more data. Defaults to FALSE.
        async: React.PropTypes.bool,

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
            async: false,
            allColumnsThatCouldBeRendered: [],

            //Change these to what we'll probably use in prod.
            width: 1500,
            height: 500,
            rowHeight: 40,
            headerHeight: 40
        };
    },
    getInitialState() {
        const avgColWidth = this._getAvgColWidth();
        return {
            columnWidths: _(this.props.columns).map(() => avgColWidth),
        }
    },
    componentWillReceiveProps(nextProps, nextState) {
        const mapToScale = (x, inMax, outMin, outMax) => (x * (outMax - outMin) / (inMax + outMin));

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

            const currentColumnWidths = _(this.state.columnWidths).map((val) => {
                //Add
                if (nextPropsMore) {
                    return mapToScale(val, this.props.width, 0, nextProps.width - (diff * avgColWidth));
                }
                //Remove
                else {
                    return mapToScale(val, this.props.width - (diff * avgColWidth), 0, nextProps.width)
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
    _onResize(newWidth, dataKey) {
        let newColumns = this.state.columnWidths;
        newColumns[dataKey] = Math.max(40, newWidth);
        this.setState({columnWidths: newColumns});
    },
    _onSearchChange(val) {
        if (typeof this.props.onSearch === 'function') {
            this.props.onSearch(val);
        }
    },
    _onFilter() {
        if (typeof this.props.onFilter === 'function') {
            this.props.onFilter(); // FIXME
        }
    },
    _onSort() {
        if (typeof this.props.onSort === 'function') {
            this.props.onSort(); // FIXME
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
        return props.width / props.columns.length;
    },
    render() {
        const data = this.props.data;
        const columnsToRender = this.props.columns;
        const columnsData = _(columnsToRender).map((val, index) => {
            return _.pluck(data, index);
        });

        let columnsEls= _(columnsToRender).map((val, index) => {
            return (
                <Column
                    columnKey={index}
                    header={"Col " + val}
                    key={index}
                    id={`column-${index}`}
                    dataKey={index}
                    width={this.state.columnWidths[index]}
                    isResizable={true}
                    cell={(props) => {
                        return (
                            <div>
                                <i className='fa fa-clock-o' />
                                {data[props.rowIndex][index]}
                            </div>
                        )
                    }}
                />
            );
        });

        const props = this.props;
        return (
            <div className='bui-table-holder'>
                <TableHeader
                    onColumnChange={this._onColumnChange}
                    onSearchChange={this._onSearchChange}
                    allColumnsThatCouldBeRendered={props.allColumnsThatCouldBeRendered}
                    currentColumns={columnsToRender}
                />
                <Table
                    isColumnResizing={false}
                    overflowX='hidden'
                    onColumnResizeEndCallback={this._onResize}
                    onScrollEnd={this._onScrollEnd}
                    rowHeight={props.rowHeight}
                    rowsCount={props.data.length}
                    width={props.width}
                    height={props.height}
                    headerHeight={props.headerHeight}>
                    {columnsEls}
                </Table>
            </div>
        );
    }
});


export default TableHolderComponent;
