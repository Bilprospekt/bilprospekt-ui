import React from 'react';
import _ from 'underscore';
import InputField from '../input-field';

import DropdownMenu from '../drop-down-menu';
const {DropdownHolder, DropdownElement} = DropdownMenu;

const TableActionBar = React.createClass({

    propTypes: {

        //If we want to be able th change between columns, these three values needs to be set.
        allColumnsThatCouldBeRendered: React.PropTypes.array,
        currentColumns: React.PropTypes.array,
        onColumnChange: React.PropTypes.func,

        onSearchChange: React.PropTypes.func,

        justifyColumns: React.PropTypes.func,
    },

    _onColumnChange(columnVal) {
        const {allColumnsThatCouldBeRendered, currentColumns, onColumnChange} = this.props;
        let newColumns = currentColumns.slice();
        //Invalid values provided, ignore changes.
        if (typeof onColumnChange !== 'function' || !allColumnsThatCouldBeRendered || !currentColumns) return;

        const column = _(allColumnsThatCouldBeRendered).findWhere({val: columnVal});
        const index = _(newColumns).findIndex((col) => col.val === columnVal);
        if (index !== -1) {
            newColumns.splice(index, 1);
        } else {
            newColumns.push(column);
            let sorting = _(allColumnsThatCouldBeRendered).pluck('val');
            newColumns = _(newColumns).chain()
                .map((item) => {
                    var n = sorting.indexOf(item.val);
                    sorting[n] = '';
                    return [n, item]
                })
                .sort()
                .map((j) => j[1]).value();
        }

        onColumnChange(newColumns);
    },

    render() {
        const props = this.props;
        let columnChanger = null;
        if (props.allColumnsThatCouldBeRendered && props.currentColumns) {
            const columns = _(props.allColumnsThatCouldBeRendered).map((column) => {
                const checked = _(props.currentColumns).findWhere({val : column.val});
                return <DropdownElement checkboxChecked={checked} checkbox label={column.label} onClick={this._onColumnChange.bind(this, column.val)} />
            });
            columnChanger = (
                <DropdownHolder noArrow orientation="right" icon="fa-cogs table-icon" style={{float: 'left'}}>
                    {columns}
                </DropdownHolder>
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
