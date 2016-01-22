import React from 'react';
import _ from 'underscore';

import {Table, TableDataWrapper} from 'bilprospekt-ui'

const alpha = "abcdefghijklmnopqrstuvxy".split("").slice(0, 8);
const rowsCycle = 1000;
const getRows = (columns, start = 0) => {
    const rows = _.range(rowsCycle).map((val, index) => {
        const newRow = {};
        _(columns).each(function(val) {
            newRow[val] = val + (start + index);
        });
        return newRow;
    });
    return rows;
};
const alphaObj = _(alpha).map((val) => {
    return {
        val,
        label: `Col ${val}`,
    };
});

const columns = alpha.slice(0, 5);
const dataWrapper = new TableDataWrapper(
    getRows(alpha),
    _(columns).map((val) => {
        return {
            val: val,
            label: `Col ${val}`,
        };
    })
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

    render() {
        return (
            <div style={{width: '100%'}}>
                <p className='table-header-label'>Table</p>
                <Table
                    allColumnsThatCouldBeRendered={alphaObj}
                    makeRowsSelectable
                    headerLabel="Now this is podracing"
                    searchHint="Now this is podracing"
                    {...this.state}

                    {...dataWrapper.triggers()}
                />
            </div>
        );
    }
});

export default TableDocComponent;
