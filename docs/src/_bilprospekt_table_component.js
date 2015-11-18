import React from 'react';

import {Table} from 'bilprospekt-ui'

const TableDocComponent = React.createClass({
    render() {
        return (
            <div style={{width: '100%'}}>
                <p className='table-header-label'>Table</p>
                <Table />
            </div>
        );
    }
});

export default TableDocComponent;
