import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import {NormalCell} from './cells';

const {Table, Column, Cell} = FixedDataTable;

const rowGetter = (data, props) => {
    //If we want any other cell, we have add logic here
    return <NormalCell data={data} {...props} />
};

const TableHolderComponent = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        columns: React.PropTypes.array.isRequired,
    },
    getDefaultProps() {
        return {
            data: [],
            columns: [],
        };
    },
    getInitialState() {
        const avgColWidth = this._getAvgColWidth();
        return {
            columnWidths: _(this.props.columns).map(() => avgColWidth)
        }
    },
    _onResize(newWidth, dataKey) {
        let newColumns = this.state.columnWidths;
        newColumns[dataKey] = Math.max(40, newWidth);
        this.setState({columnWidths: newColumns});
    },
    _onCellHover(props, state) {
        const {columnKey} = props;
        let newColumns = this.state.columnWidths;
        const maxColumnContentWidth = Math.max.apply(null, _(props.data).map((x) => x.length));

        //We can already see everything in this column, no need to resize.
        //if (maxColumnContentWidth < this.state.columnWidths[columnKey]) return;

        const avgWidth = this._getAvgColWidth();
        newColumns[columnKey] = state ? avgWidth : avgWidth;
        this.setState({columnWidths: newColumns});
    },
    _getAvgColWidth() {
        return 1500 / this.props.columns.length;
    },
    componentWillUpdate() {
        console.time('update');
        this.test = true;
    },
    componentDidUpdate() {
        console.timeEnd('update');
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
                        console.time('get cell');
                        props.onHover = this._onCellHover;
                        const cell =  rowGetter(columnsData[index], props);
                        console.timeEnd('get cell');
                        return cell;
                    }}
                />
            );
        });

        return (
            <Table
                isColumnResizing={false}
                overflowX='hidden'
                onColumnResizeEndCallback={this._onResize}
                rowHeight={40}
                rowsCount={this.props.data.length}
                width={1500}
                height={500}
                headerHeight={40}>
                {columns}
            </Table>

        )
    }
});


export default TableHolderComponent;
