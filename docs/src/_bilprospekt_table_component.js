import React from 'react';
import _ from 'underscore';

import {Table} from 'bilprospekt-ui'

const alpha = "abcdefghijklmnopqrstuvxy".split("").slice(0, 8);
const rows = _.range(1000).map((val, index) => {
    return alpha.map(function(val) {
        return val + index;
    });
});

const TableDocComponent = React.createClass({
    render() {
        return (
            <div style={{width: '100%'}}>
                <p className='table-header-label'>Table</p>
                <Table data={rows} columns={alpha} />
            </div>
        );
    }
});

export default TableDocComponent;
