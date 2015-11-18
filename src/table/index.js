import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';

const {Table, Column, Cell} = FixedDataTable;
const alpha = "abcdefghijklmnopqrstuvxy".split("").slice(0, 15);
const rows = _(_.range(10000)).map((val, index) => {
    return alpha.map(function(val) {
        return val + index;
    });
});

const onClick = (e) => console.log('target', e.target);

const rowGetter = (rowIndex, columnIndex, props) => {
    const val = rows[rowIndex][columnIndex];
    return (
        <Cell {...props} onClick={onClick}>{val}</Cell>
    );
};

const TableHolderComponent = React.createClass({
    propTypes: {
    },
    getInitialState() {
        return {
            columns: alpha.map(() => 80)
        }
    },
    _onResize(newWidth, dataKey) {
        let newColumns = this.state.columns;
        newColumns[dataKey] = Math.max(40, newWidth);
        this.setState({columns: newColumns});
    },
    render() {
        var columns = _(alpha).map((val, index) => {
            return (
                <Column
                    columnKey={index}
                    header={"Col " + val}
                    key={index}
                    dataKey={index}
                    width={this.state.columns[index]}
                    isResizable={true}
                    cell={(props) => {
                        return rowGetter(props.rowIndex, index, props);
                    }}
                />
            );
        });

        return (
            <Table
                isColumnResizing={false}
                overflowX='hidden'
                onColumnResizeEndCallback={this._onResize}
                rowHeight={60}
                rowsCount={rows.length}
                width={1500}
                height={500}
                headerHeight={60}>
                {columns}
            </Table>

        )
    }
});


export default TableHolderComponent;
