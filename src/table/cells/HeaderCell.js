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
    _onFilter() {
        if (typeof this.props.onFilter === 'function') {
            this.props.onFilter([this.props.val, this.props.val + '0']);
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
            filterIcon = (
                <DropdownHolder onToggle={this._onFilterToggle}>
                    <DropdownElement checkbox onClick={this._onFilter} label="test" />
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
