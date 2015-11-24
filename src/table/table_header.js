import React from 'react';
import _ from 'underscore';
import InputField from '../input-field';

const TableActionBar = React.createClass({

    propTypes: {
        onSearchChange: React.PropTypes.func
    },

    render() {
        return (
            <div className='bui-table-action-bar'>
                Now this is podracing
                <InputField onChange={this.props.onSearchChange} hint="Now this is searching" icon="fa-search" />
                <div className="bui-table-icon-holder">
                    <i className="fa fa-cogs" />
                </div>
            </div>
        )
    }

});

export default TableActionBar;
