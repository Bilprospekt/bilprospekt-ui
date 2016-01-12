import React from 'react';
import _ from 'underscore';
import Checkbox from '../checkbox';
import Infinite from 'react-infinite';
import $ from 'jquery';

const componentClassName = 'bui-table-filter-popup';
import InputField from '../input-field';
import ActionButton from '../action-button';

const TableFilterPopupComponent = React.createClass({

    propTypes: {

        //[{id, text}]
        availableFilters: React.PropTypes.array,
        currentFilters: React.PropTypes.array,
        onFilter: React.PropTypes.func,
        unmount: React.PropTypes.func.isRequired,
        val: React.PropTypes.string.isRequired,

        top: React.PropTypes.number.isRequired,
        left: React.PropTypes.number.isRequired,
    },

    _onFilter(val) {
        if (typeof this.props.onFilter === 'function') {
            this.props.onFilter(val);
        }

        //Make sure list updates
        this.forceUpdate();
    },

    _checkForUnmount(e) {
        const $target = $(e.target);
        const isSelf = $target.hasClass(componentClassName) || $target.parents().hasClass(componentClassName);
        if (!isSelf) {
            this.props.unmount();
        }
    },

    componentDidMount() {
        $(document.body).bind('click', this._checkForUnmount);
    },

    componentWillUnmount() {
        $(document.body).unbind('click', this._checkForUnmount);
    },

    getInitialState() {
        return {
            page: 1,
            filterSearch: '',
        };
    },

    _onFilterSearch(val) {
        this.setState({
            filterSearch: val,
        });
    },

    _handleInfiniteLoading() {
        this.setState({
            page: this.state.page + 1,
        });
    },

    render() {
        let availableFilters = this.props.availableFilters;
        if (this.state.filterSearch) {
            availableFilters = _(availableFilters)
                .filter((val) => {
                    if (this.state.filterSearch) return val.text.indexOf(this.state.filterSearch) !== -1;
                    return true;
                });
        }

        let filters = availableFilters.slice(0, this.state.page * 30);
        filters = _(filters).chain()
                  .sortBy('text').map((val, index) => {
                    const checked = _(this.props.currentFilters).find((current) => current[0] === this.props.val && current[1] === val.id);

                    return (
                        <Checkbox checked={!!checked}
                            key={index}
                            onChange={this._onFilter.bind(this, val.id)}
                            label={val.text} />
                    )
                  })
                  .value();

        const conHeight = 220;
        const childHeight = 32;
        const popupstyle = {
            position: 'absolute',
            top: this.props.top,
            left: Math.max(0, this.props.left - 171), // Minus self width
            zIndex: 100,
            height: conHeight + 154,
            width: 200,
        };

        return (
            <div className={componentClassName + ' bui-form-elements-dropdown-holder'} style={popupstyle}>
                <p className='bui-table-filter-label'>Sortera this.kolumn.name</p>
                <ActionButton label='Stigande' toggle={true} selected={false} />
                <ActionButton label='Fallande' toggle={true} selected={false} />

                <p className='bui-table-filter-label'>Filtrera this.kolumn.name</p>
                <InputField onChange={this._onFilterSearch} value={this.state.filterSearch} hint='Sök värden' />
                <Infinite onInfiniteLoad={this._handleInfiniteLoading}
                    containerHeight={conHeight}
                    elementHeight={childHeight}
                    infiniteLoadBeginEdgeOffset={200}
                    className='infinite-holder'
                >
                    {filters}
                </Infinite>
            </div>
        )
    },

});

export default TableFilterPopupComponent;
