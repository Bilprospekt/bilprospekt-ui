import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import TableHeader from './table_header';
import TableJawboneFilter from './table_jawbone_filter';
import $ from 'jquery';
const debug = require('debug')('bilprospekt-ui:table');

import Loader from '../loader';

const {Table, Column, Cell} = FixedDataTable;

import {HeaderCell, NormalCell, SelectorCell} from './cells';
import ColumnWidthHelper from './helpers/column_width_helper.js';

const columnWidthHelper = new ColumnWidthHelper(1, []);
const selectorColumnWidth = 47;

const TableHolderComponent = React.createClass({
    propTypes: {
        //The data for the rows
        data: React.PropTypes.array.isRequired,

        //The current columns that should be rendered.
        columns: React.PropTypes.array.isRequired,

        //All the filters for the columns. Indexed by column key.
        columnFilters: React.PropTypes.object,

        //The current selected filters
        currentFilters: React.PropTypes.array,

        //All the columns that the user can pick between.
        allColumnsThatCouldBeRendered: React.PropTypes.array,
        onColumnChange: React.PropTypes.func,

        //Width and height of table
        width: React.PropTypes.oneOfType([
            React.PropTypes.oneOf(['auto']),
            React.PropTypes.number,
        ]),

        //Max height of table
        height: React.PropTypes.number,

        //Current sort value
        sort: React.PropTypes.shape({
            direction: React.PropTypes.string.isRequired,
            column: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number,
            ]).isRequired,
        }),

        showLoadingComponent: React.PropTypes.bool,

        rowHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,
        headerLabel: React.PropTypes.node,

        //If we should have a checkbox for rows.
        makeRowsSelectable: React.PropTypes.bool,
        //What rows are selected if we have makeRowsSelectable.
        selectedRows: React.PropTypes.array,
        //On a selection if we have makeRowsSelectable.
        onSelection: React.PropTypes.func,

        //Search hint
        searchHint: React.PropTypes.string,
        //If we want or don't want search
        useSearch: React.PropTypes.bool,


        //Trigger functions that haven't already been listed.
        onSearch: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        onSort: React.PropTypes.func,
        onReachedBottom: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            data: [],
            columns: [],
            columnFilters: {},
            allColumnsThatCouldBeRendered: [],
            makeRowsSelectable: false,

            //Change these to what we'll probably use in prod.
            width: 'auto',
            height: 500,
            rowHeight: 46,
            headerHeight: 50,
            showLoadingComponent: false,
            useSearch: true,
            searchHint: '',
        };
    },
    getInitialState() {
        return {
            showJawbone: false,
        };
    },
    componentDidMount() {
        columnWidthHelper.onChange(() => this.forceUpdate());
        if (this.props.width === 'auto') {
            this._setDynamicWidthOnTable();
            $(window).on('resize', this._setDynamicWidthOnTable);
        } else {
            columnWidthHelper.setTotalWidth(this.props.width);
        }
    },
    _setDynamicWidthOnTable() {
        let width = $(this._holder).width();
        if (this.props.makeRowsSelectable) {
            width -= selectorColumnWidth;
        }
        columnWidthHelper.setTotalWidth(width);
    },
    componentWillUnmount() {
        $(window).off('resize', this._setDynamicWidthOnTable);
        columnWidthHelper.destroyListeners();
    },
    componentWillMount() {
       columnWidthHelper.setIdentifiers(_(this.props.columns).pluck('val'));
    },
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.columns.length !== this.props.columns.length) {
            columnWidthHelper.setIdentifiers(_(nextProps.columns).pluck('val'));
        }
    },
    _onColumnResize(newWidth, col) {
        columnWidthHelper.setWidthForIdentifier(col, newWidth);
    },
    _onSearchChange(val) {
        if (typeof this.props.onSearch === 'function') {
            this.props.onSearch(val);
        }
    },
    _onSort(payload) {
        if (typeof this.props.onSort === 'function') {
            this.props.onSort(payload);
        }
    },
    _onColumnChange(newColumns) {
        if (typeof this.props.onColumnChange === 'function') {
            this.props.onColumnChange(newColumns);
        }
    },
    _onScrollEnd(x, y) {
        //onReachedBottom not a function, no need to do anything here then.
        if (typeof this.props.onReachedBottom !== 'function') return;

        const {rowHeight, data, height} = this.props;
        var triggerLimit = rowHeight * 20;
        var totalTableHeight = rowHeight * data.length - height;
        if (y > (totalTableHeight - triggerLimit)) {
            this.props.onReachedBottom();
        }
    },
    _onColumnHover({col}, state) {
        const {columnWidths} = columnWidthHelper.getState();
        const oldWidth = columnWidths[col];
        const newWidth = (state) ? oldWidth + 20 : oldWidth - 20;
        columnWidthHelper.setWidthForIdentifier(col, newWidth);
    },
    _showJawboneFilter() {
        this.setState({ showJawbone: !this.state.showJawbone });
    },
    _onChipRemove(key, val) {
        if (typeof this.props.onFilter === 'function') {
            this.props.onFilter([key, val]);
        }
    },
    render() {
        const data = this.props.data;
        const columnsToRender = this.props.columns;

        const {columnWidths, totalWidth} = columnWidthHelper.getState();
        debug('Column widths are', columnWidths, 'Total width', totalWidth);

        let cols = _(columnsToRender).map((col, index) => {
            const columnWidth = columnWidths[col.val];
            //Last element is not resizable
            const isResizable = (index === columnsToRender.length - 1) ? false : true;
            return (
                <Column
                    columnKey={col.val}
                    key={col.val}
                    {...columnWidth}
                    header={(props) => {
                        const filters = this.props.columnFilters[col.val];
                        const sort = (this.props.sort && this.props.sort.column === col.val)
                                  ? this.props.sort
                                  : null;

                        return <HeaderCell
                            onFilter={this.props.onFilter}
                            sort={sort}
                            onSort={this._onSort}
                            availableFilters={filters}
                            currentFilters={this.props.currentFilters}
                            {...col}
                            {...props} />
                    }}
                    cell={<NormalCell data={data} col={col.val} />}
                    isResizable={isResizable}
                />
            );
        });

        const props = this.props;
        if (props.makeRowsSelectable) {
            const key = 'BP-selector';
            cols.unshift(
                <Column
                    columnKey={key}
                    key={key}
                    isResizable={false}
                    width={selectorColumnWidth}
                    cell={<SelectorCell data={data} onChange={props.onSelection} selections={props.selectedRows} />}
                />
            )
        }

        const tableHeight = props.height;

        const loadingComponent = props.showLoadingComponent
                  ? <LoadingComponent height={tableHeight} numResults={props.data.length}  />
                  : null;

        return (
            <div ref={(ref) => this._holder = ref} style={{position: 'relative'}} className='bui-table-holder'>
                <TableHeader
                    onColumnChange={this._onColumnChange}
                    onSearchChange={this._onSearchChange}
                    allColumnsThatCouldBeRendered={props.allColumnsThatCouldBeRendered}
                    currentColumns={columnsToRender}
                    currentFilters={this.props.currentFilters}
                    justifyColumns={columnWidthHelper.justifyColumns.bind(columnWidthHelper)}
                    headerLabel={this.props.headerLabel}
                    showJawboneFilter={this._showJawboneFilter}
                    selections={props.selectedRows}
                    onFilter={this.props.onFilter}
                    searchHint={this.props.searchHint}
                    useSearch={this.props.useSearch}
                />
                <TableJawboneFilter columns={this.props.allColumnsThatCouldBeRendered}
                    onChipRemove={this._onChipRemove}
                    currentFilters={this.props.currentFilters}
                    columnFilters={this.props.columnFilters}

                    visible={this.state.showJawbone} />
                <Table
                    isColumnResizing={false}
                    overflowX='hidden'
                    onColumnResizeEndCallback={this._onColumnResize}
                    onScrollEnd={this._onScrollEnd}
                    rowHeight={props.rowHeight}
                    rowsCount={props.data.length}
                    width={props.makeRowsSelectable ? totalWidth + selectorColumnWidth : totalWidth}
                    height={tableHeight}
                    headerHeight={props.headerHeight}>
                {cols}
                </Table>
                {loadingComponent}
                <div id='bui-table-popup-holder' style={{position: 'absolute', top: 0, left: 0, }}/>
            </div>
        );
    }
});

const LoadingComponent = React.createClass({
    propTypes: {
        loadingText: React.PropTypes.string,
        height: React.PropTypes.number,
        numResults: React.PropTypes.number,
    },
    getDefaultProps() {
        return {
            loadingText: 'Laddar in fler resultat...',
        };
    },
    render() {
        const {numResults, height} = this.props;

        const hasLoadedResults = numResults > 0;
        const loadingStyle = {
            position: 'absolute',
            bottom: 0,
            width: '100%',

            //50 is headerHeight
            height: (hasLoadedResults) ? 40 : height - 50,
            backgroundColor: (hasLoadedResults) ? 'rgba(255, 255, 255, 0.9)' : 'white',
        };

        const textStyle = {
            paddingLeft: 5,
        };

        const text = (hasLoadedResults) ? '' : this.props.loadingText;

        return (
            <div style={loadingStyle}>
                <Loader message={text} />
            </div>
        )
    }
});

export default TableHolderComponent;
