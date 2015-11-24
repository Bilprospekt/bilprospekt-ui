import React from 'react';
import _ from 'underscore';

import {Table, TableDataWrapper} from 'bilprospekt-ui'

const alpha = "abcdefghijklmnopqrstuvxy".split("").slice(0, 8);
const rowsCycle = 10000;
const getRows = (columns, start = 0) => {
    const rows = _.range(rowsCycle).map((val, index) => {
        return columns.map(function(val) {
            return val + (start + index);
        });
    });
    return rows;
};

const columns = alpha.slice(0, 2);
const dataWrapper = new TableDataWrapper(
    getRows(alpha),
    columns
);

const TableDocComponent = React.createClass({
    getInitialState() {
        return dataWrapper.getState();
    },

    componentWillMount() {
        dataWrapper.on('change', (state) => {
            if (this.isMounted()) {
                this.setState(state);
            }
        });
    },

    componentWillUnmount() {
        dataWrapper.off('change');
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
                    data={this.state.data}
                    columns={this.state.columns}

                    {...dataWrapper.triggers()}
                />
            </div>
        );
    }
});

export default TableDocComponent;
