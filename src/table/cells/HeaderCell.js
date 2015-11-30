import React from 'react';
import _ from 'underscore';
import DropdownMenu from '../../drop-down-menu/';
const {DropdownHolder, DropdownElement} = DropdownMenu;

const HeaderCell = React.createClass({
    propTypes: {
        val: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onSort: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        availableFilters: React.PropTypes.array,
        currentFilters: React.PropTypes.array,
    },
    getInitialState() {
        return {
            hover: false,
            filterIsOpen: false,
        };
    },
    _onMouseEnter() {
        this.setState({
            hover: true,
        });
    },
    _onMouseLeave() {
        if (this.state.filterOpen) return;
        this.setState({
            hover: false,
        });
    },
    _onFilter(val) {
        if (typeof this.props.onFilter === 'function') {
            this.props.onFilter([this.props.val, val]);
        }
    },
    _onFilterToggle(val) {
        let hover = this.state.hover;
        if (!val && this.state.hover) hover = false;
        this.setState({
            filterOpen: val,
            hover,
        });
    },
    render() {
        let filterIcon = null;
        if (this.state.hover) {
            const availableFilters = _(this.props.availableFilters).map((val, index) => {
                const checked = _(this.props.currentFilters).find((current) => current[0] === this.props.val && current[1] === val);
                return (
                    <DropdownElement checkboxChecked={checked} key={index} checkbox onClick={this._onFilter.bind(this, val)} label={val} />
                )
            });
            filterIcon = (
                <DropdownHolder useInfiniteScroll onToggle={this._onFilterToggle}>
                    {availableFilters}
                </DropdownHolder>
            );
        }

        return (
            <div
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
                onClick={this.onSort}>
                    {this.props.label}
                    {filterIcon}
            </div>
        )
    }
});

export default HeaderCell;
