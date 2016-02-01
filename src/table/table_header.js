import React from 'react';
import _ from 'underscore';
import InputField from '../input-field';
import classNames from 'classnames';

import DropdownMenu from '../drop-down-menu';
const {DropdownHolder, DropdownElement} = DropdownMenu;

const TableHeader = React.createClass({

    propTypes: {

        //If we want to be able th change between columns, these three values needs to be set.
        allColumnsThatCouldBeRendered: React.PropTypes.array,
        currentColumns: React.PropTypes.array,
        onColumnChange: React.PropTypes.func,

        currentFilters: React.PropTypes.array,

        onSearchChange: React.PropTypes.func,
        useSearch: React.PropTypes.bool,
        searchHint: React.PropTypes.string,

        showJawboneFilter: React.PropTypes.func,

        justifyColumns: React.PropTypes.func,
        headerLabel: React.PropTypes.node,

        //If we have any selections that should be used when "showSelections" is triggered
        selections: React.PropTypes.array,
        //Function to use on "showSelections" trigger
        onFilter: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            currentFilters: [],
            selections: [],
        };
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

    _filterOnSelections() {
        const {currentFilters, selections, onFilter} = this.props;
        const selectionsFilter = _(selections).map((n) => ['_id', n]);
        const currentSelectionsFilters = _(currentFilters).filter((n) => n[0] === '_id');

        if (selections.length && typeof onFilter === 'function') {
            onFilter(
                currentSelectionsFilters.length ? currentSelectionsFilters : selectionsFilter
            );
        }
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
        if (props.allColumnsThatCouldBeRendered && props.allColumnsThatCouldBeRendered.length && props.currentColumns && props.currentColumns.length) {
            const columns = _(props.allColumnsThatCouldBeRendered).map((column, key) => {
                const checked = _(props.currentColumns).findWhere({val : column.val});
                return <DropdownElement key={key} checkboxChecked={!!checked} checkbox label={column.label} onClick={this._onColumnChange.bind(this, column.val)} />
            });
            columnChanger = (
                <DropdownHolder noArrow orientation="right" icon="fa-align-right table-icon" style={{float: 'left'}}>
                    {columns}
                </DropdownHolder>
            );
        }

        const tableSearchClass = classNames('bui-table-search', {
            'display-search': this.state.displaySearch,
        });

        let tableSearch = null;

        if (this.props.useSearch) {
            tableSearch = (
                <div className={tableSearchClass}>
                    <i className="fa fa-search table-icon" onClick={this._displaySearch} />
                    <InputField ref='tableSearchInputRef' hint={this.props.searchHint} onChange={this.props.onSearchChange} icon="fa-search" onBlur={this._searchBlur} />
                </div>
            );
        }

        const filtersWithoutId = _(this.props.currentFilters).filter((n) => n[0] !== '_id');
        //Filter Jawbone
        const filterCount = (filtersWithoutId.length)
                  ? <span className='toggle-filter-text'>{filtersWithoutId.length}</span>
                  : null;

        const jawboneParentClass = classNames('bui-table-toggle-filter-button', {
            'bui-inactive-filter-button': !filtersWithoutId.length,
        });

        const jawboneFilter = (
            <div className={jawboneParentClass}>
                <i className="fa fa-filter table-icon" onClick={this.props.showJawboneFilter} />
                {filterCount}
            </div>
        );


        //Selections Icon
        const selectionsParentClass = classNames('bui-table-toggle-filter-button', {
            'bui-inactive-filter-button': !this.props.selections.length,
        });

        const selectionsCount = (this.props.selections.length)
                  ? <span className='toggle-filter-text'>{this.props.selections.length}</span>
                  : null;

        const selectionsFilter = (
            <div className={selectionsParentClass}>
                <i className="fa fa-bus table-icon" onClick={this._filterOnSelections} />
                {selectionsCount}
            </div>
        );

        let headerLabel = this.props.headerLabel;
        if (this.props.selections.length) {
            if (this.props.selections.length === 1) {
                headerLabel = <span className='table-active-selections-label'>Du har markerat {this.props.selections.length} rad</span>;
            } else {
                headerLabel = <span className='table-active-selections-label'>Du har markerat {this.props.selections.length} rader</span>;
            }
        }

        return (
            <div className='bui-table-action-bar'>
                <div className='bui-table-text-holder'>
                    {headerLabel}
                </div>
                <div className='bui-table-actions-holder'>
                    {tableSearch}
                    {jawboneFilter}
                    <i className="fa fa-arrows-h table-icon" onClick={this.props.justifyColumns} />
                    {selectionsFilter}
                    {columnChanger}
                </div>
            </div>
        )
    }

});

export default TableHeader;
