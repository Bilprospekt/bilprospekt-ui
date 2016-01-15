import React from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import $ from 'jquery';

import {Chips} from 'bilprospekt-ui';

const TableJawboneFilter = React.createClass({

    propTypes: {
        visible: React.PropTypes.bool.isRequired,
        currentFilters: React.PropTypes.array.isRequired,
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
                values = _(values).map((x) => x[1]);
                return (
                    <FilterRowComponent onChipRemove={this.props.onChipRemove} label={key} values={values} />
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
        values: React.PropTypes.array.isRequired,
        onChipRemove: React.PropTypes.func,
    },
    _onChipRemove(value) {
        if (typeof this.props.onChipRemove === 'function') {
            this.props.onChipRemove(this.props.label, value);
        }
    },
    render() {
        const {label, values} = this.props;
        const chips = _(values).map((value) => {
            return <Chips onRemoveClick={this._onChipRemove.bind(this, value)} label={value} />;
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
