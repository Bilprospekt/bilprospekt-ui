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

        //If we don't want to be able to sort on this column
        useSort: React.PropTypes.bool,

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

        const {internalSelections} = this.state;
        const index = _(internalSelections).findIndex((x) => x[1] === val);
        if (index !== -1) {
            internalSelections.splice(index, 1);
        } else {
            internalSelections.push([this.props.val, val]);
        }

        this.setState({
            internalSelections,
        });
    },

    _checkForUnmount(e) {
        const $target = $(e.target);
        const isSelf = $target.hasClass(componentClassName) || $target.parents().hasClass(componentClassName);
        if (!isSelf) {
            this.props.unmount();
        }
    },

    componentWillReceiveProps(nextProps) {
        let obj = {
            //Delete internal selections when we get new props, correct selections will be included there.
            internalSelections: this.props.currentFilters.slice() || [],
        };

        if (nextProps.sort) {
            obj.sort = nextProps.sort;
        }

        this.setState(obj);
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
            internalSelections: this.props.currentFilters.slice() || [],
        };
    },

    getDefaultProps() {
        return {
            useSort: true,
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
                    if (this.state.filterSearch) return val.text.toLowerCase().indexOf(this.state.filterSearch.toLowerCase()) !== -1;
                    return true;
                });
        }

        function compareValues(a, b) {
            return a - b;
        };

        let filters = availableFilters.slice(0, this.state.page * 30);
        filters = _(filters).chain()
                  .sortBy(compareValues).map((val, index) => {
                    let checked = _(this.state.internalSelections).find((current) => current[0] === this.props.val && current[1] === val.id);

                    return (
                        <div key={index} className='dropdown-element'>
                            <Checkbox checked={!!checked}
                                key={index}
                                onChange={this._onFilter.bind(this, val.id)}
                                label={val.text} />
                        </div>
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
            height: conHeight + 52 + (this.props.useSort ? 55 : 0) ,
            width: 200,
        };

        const sortDir = this.state.sort && this.state.sort.direction;

        let sortDiv = null;
        if (this.props.useSort) {
            sortDiv = (
                <div className='bui-table-filter-popup-actions-holder'>
                    <ActionButton label='Stigande' onClick={this._onSort.bind(this, 'ASC')} toggle={true} selected={sortDir === 'ASC'} />
                    <ActionButton label='Fallande' onClick={this._onSort.bind(this, 'DESC')} toggle={true} selected={sortDir === 'DESC'} />
                </div>
            );
        }

        return (
            <div className={componentClassName + ' bui-form-elements-dropdown-holder'} style={popupstyle}>
                {sortDiv}
                <div className='bui-table-filter-popup-search-holder'>
                    <InputField onChange={this._onFilterSearch} value={this.state.filterSearch} hint='Sök värden' icon='fa-search' />
                </div>
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
