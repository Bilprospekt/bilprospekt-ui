import React from 'react';
import _ from 'underscore';

import {Table} from 'bilprospekt-ui'

const alpha = "abcdefghijklmnopqrstuvxy".split("").slice(0, 8);
const rowsCycle = 100;
const getRows = (columns, start = 0) => {
    const rows = _.range(rowsCycle).map((val, index) => {
        return columns.map(function(val) {
            return val + (start + index);
        });
    });
    return rows;
};

const TableDocComponent = React.createClass({
    getInitialState() {
        const columns = alpha.slice(0, 2);
        return {
            columns: columns,
            data: getRows(columns),
        };
    },

    _getMoreData() {
        if (this.state.data.length >= 1000) return;
        this.setState({
            data: this.state.data.concat(getRows(this.state.columns, this.state.data.length)),
        });
    },

    _onColumnChange(newColumns) {
        const newData = _(_.range(this.state.data.length / rowsCycle)).chain()
                  .map((val) => {
                      return getRows(newColumns, val * rowsCycle);
                  })
                  .flatten(true)
                  .value();

        this.setState({
            columns: newColumns,
            data: newData
        });
    },

    render() {
        return (
            <div style={{width: '100%'}}>
                <p className='table-header-label'>Table</p>
                <Table
                    allColumnsThatCouldBeRendered={alpha}
                    onReachedBottom={this._getMoreData}
                    data={this.state.data}
                    columns={this.state.columns}
                    onColumnChange={this._onColumnChange}
                />
            </div>
        );
    }
});

export default TableDocComponent;
