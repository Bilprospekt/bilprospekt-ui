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
        onSort: React.PropTypes.func,

        //Current sort
        sort: React.PropTypes.shape({
            direction: React.PropTypes.string.isRequired,
        }),
        unmount: React.PropTypes.func.isRequired,
        val: React.PropTypes.string.isRequired,
        columnLabel: React.PropTypes.string.isRequired,

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.sort) {
            this.setState({
                sort: nextProps.sort,
            });
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


            //Since we're in a seperate tree, we'll need to keep track of sort value ourself.
            sort: this.props.sort || {},
        };
    },

    _onFilterSearch(val) {
        this.setState({
            filterSearch: val,
        });
    },

    _onSort(direction) {
        if (typeof this.props.onSort === 'function') {
            const payload = {columnKey: this.props.val, direction: direction, };
            this.props.onSort(payload);
            this.setState({
                sort: (this.state.sort && direction === this.state.sort.direction) ? null : payload,
            })
        }
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

        const sortDir = this.state.sort && this.state.sort.direction;

        return (
            <div className={componentClassName + ' bui-form-elements-dropdown-holder'} style={popupstyle}>
                <p className='bui-table-filter-label'>{this.props.columnLabel}</p>
                <ActionButton label='Stigande' onClick={this._onSort.bind(this, 'ASC')} toggle={true} selected={sortDir === 'ASC'} />
                <ActionButton label='Fallande' onClick={this._onSort.bind(this, 'DESC')} toggle={true} selected={sortDir === 'DESC'} />

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
