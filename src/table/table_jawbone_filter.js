import React from 'react';
import classNames from 'classnames';

import {Chips} from 'bilprospekt-ui';

const TableJawboneFilter = React.createClass({
    render() {
        const parentClass = classNames('bui-table-jawbone-filter', {
            'bui-jawbone-is-showing': this.props.visible,
        });

        return (
            <div className={parentClass}>
                <div className='jawbone-filter-row-holder'>
                    <div className='jawbone-row-label'>
                        <span className='row-label-name'>Col b</span> filter
                        <i className='fa fa-arrow-right row-label-icon' />
                    </div>
                    <div className='jawbone-row-content'>
                        <Chips label='b105' />
                        <Chips label='b100' />
                    </div>
                </div>
            </div>
        )
    }

});

export default TableJawboneFilter;