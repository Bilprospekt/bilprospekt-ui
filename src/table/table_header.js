import React from 'react';
import _ from 'underscore';
import InputField from '../input-field';
import classNames from 'classnames';

import DropdownMenu from '../drop-down-menu';
import Tooltip from '../tooltip';
import SectionHeader from '../section-header';
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

        // Optional prop to add a BUI Section Header component to the table
        headerLabel: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object,
        ]),

        actionHeaderButtons: React.PropTypes.array,

        makeRowsSelectable: React.PropTypes.bool,
        //If we have any selections that should be used when "showSelections" is triggered
        selections: React.PropTypes.array,
        //Function to use on "showSelections" trigger
        onFilter: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            currentFilters: [],
            selections: [],
            makeRowsSelectable: false,
            actionHeaderButtons: [],
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

        onColumnChange(newColumns, columnVal);
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

    closeColumnChanger() {
      if (typeof this.refs.dropdownHolder !== 'undefined') {
        this.refs.dropdownHolder.close();
      }
    },

    render() {
        // Tooltips for the header actions
        const tooltipProps = {
            position: 'left',
            space: 0,
            delay: 100,
            style: {
                float: 'left',
            },
        };

        const props = this.props;
        let columnChanger = null;

        //Array of columns which should be active
      let tempCurrentColumnArr = (typeof props.currentColumns[0] === 'string') ? props.currentColumns : props.currentColumns.map(x => x.val);

      if (props.allColumnsThatCouldBeRendered && props.allColumnsThatCouldBeRendered.length && props.currentColumns) {
          const columns = _(props.allColumnsThatCouldBeRendered).map((column, key) => {
              //If column is in the currentColumn arr mark it as active.
              const checked = column.active = tempCurrentColumnArr.indexOf(column.val) > -1;
              return <DropdownElement key={key} checkboxChecked={checked} checkbox label={column.label} onClick={this._onColumnChange.bind(this, column.val)} />
          });

          columnChanger = (
              <div>
                  <DropdownHolder ref='dropdownHolder' noArrow orientation="right" icon="fa-ellipsis-h table-icon">
                      {columns}
                  </DropdownHolder>
              </div>
          );

          columnChanger = <Tooltip string='Välj kolumner att visa' {...tooltipProps}>{columnChanger}</Tooltip>;
      }

      const tableSearchClass = classNames('bui-table-search', {
          'display-search': this.state.displaySearch,
      });

      let tableSearch = null;

      if (this.props.useSearch) {
          tableSearch = (
              <div className={tableSearchClass}>
                  <Tooltip string='Snabbsök i tabellen' {...tooltipProps}>
                      <i className="fa fa-search table-icon" onClick={this._displaySearch} />
                  </Tooltip>
                  <InputField ref='tableSearchInputRef' icon="fa-search" hint={this.props.searchHint} fastRemove onChange={this.props.onSearchChange} onBlur={this._searchBlur} />
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

      let selectionsFilter = null;
      if (this.props.makeRowsSelectable) {
          selectionsFilter = (
              <div className={selectionsParentClass}>
                  <i className="fa fa-check table-icon" onClick={this._filterOnSelections} />
                  {selectionsCount}
              </div>
          );
          selectionsFilter = <Tooltip string='Visa markerade rader' {...tooltipProps}>{selectionsFilter}</Tooltip>;
      }

      // this.props.headerLabel
      let headerLabel;
      if (typeof this.props.headerLabel === 'string') {
          if (this.props.selections.length) {
              if (this.props.selections.length === 1) {
                  headerLabel = <span className='table-active-selections-label'>Du har markerat {this.props.selections.length} rad</span>;
              } else {
                  headerLabel = <span className='table-active-selections-label'>Du har markerat {this.props.selections.length} rader</span>;
              }
          } else {
              headerLabel = this.props.headerLabel;
          }
      } else if (_.isObject(this.props.headerLabel)) {
          headerLabel = (
              <SectionHeader
                  icon={this.props.headerLabel.icon}
                  label={this.props.headerLabel.label}
                  desc={this.props.headerLabel.desc}
                  descType={this.props.headerLabel.descType}
                  actionLabel={this.props.headerLabel.actionLabel}
                  onAction={this.props.headerLabel.onAction}
                  style={this.props.headerLabel.style}
                  highlighted={this.props.headerLabel.highlighted}
                  />
          );
      } else {
          headerLabel = '';
      }

    // Override headerLabel with actionHeaderButtons
    if (this.props.actionHeaderButtons && this.props.actionHeaderButtons.length) {
      let i = 0;
      let buttons = [];
      for (let i = 0; i < this.props.actionHeaderButtons.length; i += 1) {
        let v = this.props.actionHeaderButtons[i];
        let b = <p key={i} onClick={v.onClick}><i className={'fa fa-' + v.iconClass} />{v.label}</p>;
        buttons.push(b);
      }
      headerLabel = <div className='bui-table-action-header-buttons'>{buttons}</div>;
    }


      return (
          <div className='bui-table-action-bar'>
              <div className='bui-table-text-holder'>
                  {headerLabel}
              </div>
              <div className='bui-table-actions-holder'>
                  {tableSearch}
                  <Tooltip string='Visa valda filter' {...tooltipProps}>{jawboneFilter}</Tooltip>
                  <Tooltip string='Återställ kolumnbredder' {...tooltipProps}><i className="fa fa-arrows-h table-icon" onClick={this.props.justifyColumns} /></Tooltip>
                  {selectionsFilter}
                  {columnChanger}
              </div>
          </div>
      )
  }

});

export default TableHeader;
