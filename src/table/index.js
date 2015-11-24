import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import TableHeader from './table_header';

const {Table, Column, Cell} = FixedDataTable;

const TableHolderComponent = React.createClass({
    propTypes: {
        //The data for the rows
        data: React.PropTypes.array.isRequired,

        //All the columns that can be rendered
        columns: React.PropTypes.array.isRequired,

        //If we want to limit your columns to something specific at start. Otherwise table will handle it.
        defaultColumns: React.PropTypes.array,

        //Width and height of table
        width: React.PropTypes.number,
        height: React.PropTypes.number,

        rowHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,

        //Trigger functions
        onSearch: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        onSort: React.PropTypes.func,
        onColumnChange: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            data: [],
            columns: [],
            defaultColumns: (this.props.columns || []),

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
    _getAvgColWidth() {
        return 1500 / this.props.columns.length;
    },
    render() {
        const data = this.props.data;
        const columnsData = _(this.props.columns).map((val, index) => {
            return _.pluck(data, index);
        });

        let columns = _(this.props.columns).map((val, index) => {
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
                <TableHeader onSearchChange={this._onSearchChange} />
                <Table
                    isColumnResizing={false}
                    overflowX='hidden'
                    onColumnResizeEndCallback={this._onResize}
                    rowHeight={props.rowHeight}
                    rowsCount={props.data.length}
                    width={props.width}
                    height={props.height}
                    headerHeight={props.headerHeight}>
                    {columns}
                </Table>
            </div>
        );
    }
});


export default TableHolderComponent;
