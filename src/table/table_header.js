import React from 'react';
import _ from 'underscore';
import InputField from '../input-field';
import classNames from 'classnames';

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
        headerLabel: React.PropTypes.node,
    },

    getInitialState() {
        return {
            displaySearch: false,
        };
    },

    componentDidUpdate() {
        if (this.state.displaySearch) {
            this.refs.tableSearchInputRef.focus();
        }
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

    _displaySearch() {
        this.setState({ displaySearch: true });
    },

    _searchBlur(e) {
        if (e.target.value === '') {
            this.setState({ displaySearch: false });
        } else {
            // Do Nothing..
        }
    },

    render() {
        const props = this.props;
        let columnChanger = null;
        if (props.allColumnsThatCouldBeRendered && props.currentColumns) {
            const columns = _(props.allColumnsThatCouldBeRendered).map((column, key) => {
                const checked = _(props.currentColumns).findWhere({val : column.val});
                return <DropdownElement key={key} checkboxChecked={!!checked} checkbox label={column.label} onClick={this._onColumnChange.bind(this, column.val)} />
            });
            columnChanger = (
                <DropdownHolder noArrow orientation="right" icon="fa-cogs table-icon" style={{float: 'left'}}>
                    {columns}
                </DropdownHolder>
            );
        }

        const tableSearchClass = classNames('bui-table-search', {
            'display-search': this.state.displaySearch,
        });

        const tableSearch = (
            <div className={tableSearchClass}>
                <i className="fa fa-search table-icon" onClick={this._displaySearch} />
                <InputField ref='tableSearchInputRef' onChange={this.props.onSearchChange} hint="Now this is searching" icon="fa-search" onBlur={this._searchBlur} />
            </div>
        );

        return (
            <div className='bui-table-action-bar'>
                <div className='bui-table-text-holder'>
                    {this.props.headerLabel}
                </div>
                <div className='bui-table-actions-holder'>
                    {tableSearch}
                    <i className="fa fa-arrows-h table-icon" onClick={this.props.justifyColumns} />
                    {columnChanger}
                </div>
            </div>
        )
    }

});

export default TableActionBar;
