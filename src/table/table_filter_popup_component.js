import React from 'react';
import _ from 'underscore';
import Checkbox from '../checkbox';
import Infinite from 'react-infinite';

const componentClassName = 'bui-table-filter-popup';

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
        };
    },

    _handleInfiniteLoading() {
        this.setState({
            page: this.state.page + 1,
        });
    },

    render() {
        const filters = this.props.availableFilters.slice(0, this.state.page * 30);
        const availableFilters = _(filters).chain().sortBy('text').map((val, index) => {
            const checked = _(this.props.currentFilters).find((current) => current[0] === this.props.val && current[1] === val.id);

            return (
                <Checkbox checked={!!checked}
                    key={index}
                    onChange={this._onFilter.bind(this, val.id)}
                    label={val.text} />
            )
        }).value();

        const conHeight = 220;
        const childHeight = 32;
        const popupstyle = {
            position: 'absolute',
            top: this.props.top,
            left: Math.max(0, this.props.left - 171), // Minus self width
            zIndex: 100,
            height: conHeight,
            width: 200,
        };

        return (
            <div className={componentClassName + ' bui-form-elements-dropdown-holder'} style={popupstyle}>
                <Infinite onInfiniteLoad={this._handleInfiniteLoading}
                    containerHeight={conHeight}
                    elementHeight={childHeight}
                    infiniteLoadBeginEdgeOffset={200}
                    className='infinite-holder'
                >
                    {availableFilters}
                </Infinite>
            </div>
        )
    },

});

export default TableFilterPopupComponent;
