import React from 'react';
import _ from 'underscore';
import InputField from '../input-field';

const TableActionBar = React.createClass({

    propTypes: {

        //If we want to be able th change between columns, these three values needs to be set.
        allColumnsThatCouldBeRendered: React.PropTypes.array,
        currentColumns: React.PropTypes.array,
        onColumnChange: React.PropTypes.func,

        onSearchChange: React.PropTypes.func,
    },

    _onColumnChange() {
        const {allColumnsThatCouldBeRendered, currentColumns, onColumnChange} = this.props;
        //Invalid values provided, ignore changes.
        if (typeof onColumnChange !== 'function' || !allColumnsThatCouldBeRendered || !currentColumns) return;

        //Simply add one on each trigger for one
        let newColumns = currentColumns.concat(
            allColumnsThatCouldBeRendered.slice(
                currentColumns.length, currentColumns.length + 1
            )
        );

        if (newColumns.length === currentColumns.length) {
            newColumns = newColumns.slice(0, 4);
        }

        onColumnChange(newColumns);
    },

    render() {
        return (
            <div className='bui-table-action-bar'>
                Now this is podracing
                <InputField onChange={this.props.onSearchChange} hint="Now this is searching" icon="fa-search" />
                <div className="bui-table-icon-holder">
                    <i className="fa fa-cogs" onClick={this._onColumnChange} />
                </div>
            </div>
        )
    }

});

export default TableActionBar;
