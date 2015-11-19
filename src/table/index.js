import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';

const {Table, Column, Cell} = FixedDataTable;

const onClick = (e) => console.log('target', e.target);

const rowGetter = (data, rowIndex, columnIndex, props) => {
    const val = data[rowIndex][columnIndex];
    return (
        <Cell {...props} onClick={onClick}>{val}</Cell>
    );
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
        return {
            columnWidths: _(this.props.columns).map(() => 1500 / this.props.columns.length)
        }
    },
    _onResize(newWidth, dataKey) {
        let newColumns = this.state.columnWidths;
        newColumns[dataKey] = Math.max(40, newWidth);
        this.setState({columnWidths: newColumns});
    },
    render() {
        const data = this.props.data;
        let columns = _(this.props.columns).map((val, index) => {
            return (
                <Column
                    columnKey={index}
                    header={"Col " + val}
                    key={index}
                    dataKey={index}
                    width={this.state.columnWidths[index]}
                    isResizable={true}
                    cell={(props) => {
                        return rowGetter(data, props.rowIndex, index, props);
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
