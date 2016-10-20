import React from 'react';
import _ from 'underscore';

import {Table, TableDataWrapper} from 'bilprospekt-ui';

const alpha = "abcdefghijklmnopqrstuvxy".split("").slice(0, 8);
const rowsCycle = 1000;
const getRows = (columns, start = 0) => {
    const rows = _.range(rowsCycle).map((val, index) => {
        const newRow = {};
        _(columns).each(function(val) {
            newRow[val] = val + (start + index);
        });
        return newRow;
    });
    return rows;
};
const alphaObj = _(alpha).map((val) => {
    return {
        val,
        label: `Col ${val}`,
    };
});

const columns = alpha.slice(0, 5);
const dataWrapper = new TableDataWrapper(
    getRows(alpha),
    _(columns).map((val) => {
        return {
            val: val,
            label: `Col ${val}`,
        };
    })
);

const TableDocComponent = React.createClass({
    getInitialState() {
        return {
            ...dataWrapper.getState(),
            headerLabel: "Now this is podracing!",
        };
    },

    componentWillMount() {
        dataWrapper.on('change', (state) => {
            if (this.isMounted()) {
                this.setState(state);
            }
        });
    },

    componentWillUnmount() {
        dataWrapper.off('change');
    },

    _toggleHeaderLabel() {
        if (typeof this.state.headerLabel != 'string') {
            this.setState({ headerLabel: "Now this is podracing!" });
        } else {
            const labelObj = {
                icon: 'fa-car',
                label: 'Table Label',
                desc: 'Table description',
                actionLabel: 'Action Button',
            };
            this.setState({ headerLabel: labelObj});
        }
    },

    render() {
        return (
            <div style={{width: '100%'}} id='TableDoc'>
                <p className='table-header-label'>Table</p>
                <p onClick={this._toggleHeaderLabel}>Toggle headerLabel from string to Section Header component</p>
                <Table
                    ref='table'
                    allColumnsThatCouldBeRendered={alphaObj}
                    makeRowsSelectable
                    headerLabel={this.state.headerLabel}
                    searchHint="Now this is podracing"
                    {...this.state}

                    {...dataWrapper.triggers()}
                />

                <pre>
                <code>
                    {
                        [
                        '<Table',
                        '\n\t data=[array]',
                        '\n\t columns=[array]',
                        '\n\t defaultWidthPercentages=[number]',
                        '\n\t columnFilters={object}',
                        '\n\t currentFilters=[array]',
                        '\n\t allColumnsThatCouldBeRendered=[array]',
                        '\n\t onColumnChange={function}',
                        '\n\t width={number}',
                        '\n\t height={number}',
                        '\n\t sort={direction="string", (column="string" || {number})}',
                        '\n\t showLoadingComponent={bool}',
                        '\n\t showNoResultsMessageComponent={bool}',
                        '\n\t noResultsMessage="string"',
                        '\n\t rowHeight={number}',
                        '\n\t headerHeight={number}',
                        '\n\t headerLabel="string"',
                        '\n\t rowClasses={object}',
                        '\n\t selectedRows=[array]',
                        '\n\t onSelection={function}',
                        '\n\t onRowClick={function}',
                        '\n\t searchHint="string"',
                        '\n\t useSearch={bool}',
                        '\n\t disableSortForColumns=[array]',
                        '\n\t onSearch={function}',
                        '\n\t onFilter={function}',
                        '\n\t onSort={function}',
                        '\n\t onReachedBottom={function}',
                        '\n/>',
                        '\n Method: closeDropdownsAndPopups()',
                        ]
                    }
                </code>
                </pre>
            </div>
        );
    }
});

export default TableDocComponent;
