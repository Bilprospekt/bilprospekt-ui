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

        justifyColumns: React.PropTypes.func,
    },

    _onColumnChange() {
        //FIXME update logic here when dropdown is added
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
        const props = this.props;
        let columnChanger = null;
        if (props.allColumnsThatCouldBeRendered && props.currentColumns) {
            columnChanger = (
                <i className="fa fa-cogs table-icon" onClick={this._onColumnChange} />
            );
        }

        return (
            <div className='bui-table-action-bar'>
                <div className='bui-table-text-holder'>
                    Now this is podracing
                </div>
                <div className='bui-table-actions-holder'>
                    <InputField onChange={this.props.onSearchChange} hint="Now this is searching" icon="fa-search" />
                    <i className="fa fa-arrows-h table-icon" onClick={this.props.justifyColumns} />
                    {columnChanger}
                </div>
            </div>
        )
    }

});

export default TableActionBar;
