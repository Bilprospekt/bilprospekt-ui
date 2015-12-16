import _ from 'underscore';
import React from 'react';
import FixedDataTable from 'fixed-data-table';
import TableHeader from './table_header';
import $ from 'jquery';

const {Table, Column, Cell} = FixedDataTable;

import {HeaderCell, NormalCell} from './cells';
import ColumnWidthHelper from './helpers/column_width_helper.js';

const columnWidthHelper = new ColumnWidthHelper(1000, []);

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

        //If we don't have scroll on window, we need to give a element to check it relative to.
        //Needs to be a jQuery selector.
        relativeScrollingEl: React.PropTypes.string,

        //All the columns that the user can pick between.
        allColumnsThatCouldBeRendered: React.PropTypes.array,
        onColumnChange: React.PropTypes.func,

        //Width and height of table
        width: React.PropTypes.oneOfType([
            React.PropTypes.oneOf(['auto']),
            React.PropTypes.number,
        ]),
        height: React.PropTypes.number,

        rowHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,
        headerLabel: React.PropTypes.node,

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

            //Change these to what we'll probably use in prod.
            width: 'auto',
            height: 500,
            rowHeight: 40,
            headerHeight: 40,
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
        const width = $(this._holder).width();
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
        const mapToScale = (x, inMax, outMax) => (x * outMax / inMax);

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
    _onSort(props) {
        if (typeof this.props.onSort === 'function') {
            this.props.onSort(props.columnKey);
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
    render() {
        const data = this.props.data;
        const columnsToRender = this.props.columns;

        const {columnWidths, totalWidth} = columnWidthHelper.getState();

        console.log('render', columnWidths, totalWidth);

        const cols = _(columnsToRender).map((col, index) => {
            return (
                <Column
                    columnKey={col.val}
                    key={col.val}
                    header={(props) => {
                        const filters = this.props.columnFilters[col.val];
                        return <HeaderCell
                        onFilter={this.props.onFilter}
                        onSort={this._onSort}
                        availableFilters={filters}
                        currentFilters={this.props.currentFilters}
                        relativeScrollingEl={this.props.relativeScrollingEl}
                        {...col}
                        {...props} />
                    }}
                    cell={<NormalCell onHover={this._onColumnHover} data={data} col={col.val} />}
                    isResizable={true}
                    width={columnWidths[col.val]} />
            );
        });

        const props = this.props;

        return (
                <div ref={(ref) => this._holder = ref} className='bui-table-holder'>
                <TableHeader
                    onColumnChange={this._onColumnChange}
                    onSearchChange={this._onSearchChange}
                    allColumnsThatCouldBeRendered={props.allColumnsThatCouldBeRendered}
                    currentColumns={columnsToRender}
                    justifyColumns={columnWidthHelper.justifyColumns.bind(columnWidthHelper)}
                    headerLabel={this.props.headerLabel}
                />
                <Table
                    isColumnResizing={false}
                    overflowX='hidden'
                    onColumnResizeEndCallback={this._onColumnResize}
                    onScrollEnd={this._onScrollEnd}
                    rowHeight={props.rowHeight}
                    rowsCount={props.data.length}
                    width={totalWidth}
                    height={props.height}
                    headerHeight={props.headerHeight}>
                {cols}
                </Table>
                <div id='bui-table-popup-holder' />
            </div>
        );
    }
});


export default TableHolderComponent;
