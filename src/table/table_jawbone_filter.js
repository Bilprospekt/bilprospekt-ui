import React from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import $ from 'jquery';

import Chips from '../chips';

const TableJawboneFilter = React.createClass({

    propTypes: {
        visible: React.PropTypes.bool.isRequired,
        currentFilters: React.PropTypes.array.isRequired,
        //Holds labels for columns
        columns: React.PropTypes.array,
        columnFilters: React.PropTypes.object,
        onChipRemove: React.PropTypes.func,
    },

    getInitialState() {
        return {
            jawboneHeight: 0,
        };
    },

    componentDidUpdate() {
        const newHeight = $(this.refs.jawboneRef).outerHeight(true);
        if (newHeight != this.state.jawboneHeight) {
            this.setState({ jawboneHeight: newHeight });
        }
    },

    render() {
        const parentClass = classNames('bui-table-jawbone-filter', {
            'bui-jawbone-is-showing': this.props.visible,
        });

        const filters = _(this.props.currentFilters).groupBy(([key, val]) => key);

        const filterRows = _(filters)
            .map((values, key) => {
                values = _(values)
                    .map((x) => {
                        const val = _(this.props.columnFilters[key]).findWhere({id: x[1]});
                        return val;
                    });
                const column = _(this.props.columns).findWhere({val: key});
                const label = (column && column.label) || key;
                return (
                    <FilterRowComponent key={key} onChipRemove={this.props.onChipRemove} keyVal={key} label={label} values={values} />
                );
            });

        const height = this.props.visible ? this.state.jawboneHeight : 0;

        return (
            <div className={parentClass} style={{height}}>
                <div className='jawbone-filter-row-holder' ref='jawboneRef'>
                    {filterRows}
                </div>
            </div>
        )
    }

});

const FilterRowComponent = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        keyVal: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]).isRequired,
        values: React.PropTypes.array.isRequired,
        onChipRemove: React.PropTypes.func,
    },
    _onChipRemove(value) {
        if (typeof this.props.onChipRemove === 'function') {
            this.props.onChipRemove(this.props.keyVal, value);
        }
    },
    render() {
        const {label, values} = this.props;
        const chips = _(values).map((value) => {
            return <Chips key={value.id} onRemoveClick={this._onChipRemove.bind(this, value.id)} label={value.text} />;
        });

        return (
            <div className='jawbone-row'>
                <div className='jawbone-row-label'>
                    <span className='row-label-name'>{label}</span> filter
                </div>
                <div className='jawbone-row-content'>
                    {chips}
                </div>
            </div>
        )
    }
});

export default TableJawboneFilter;
