import React from 'react';
import _ from 'underscore';
import {DropdownHolder, DropdownElement} from '../drop-down-menu';

const Select = React.createClass({
    propTypes: {
        selectedOption: React.PropTypes.number,
        onChange: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            selectedOption: 0,
        };
    },
    getInitialState() {
        const children = React.Children.toArray(this.props.children);
        return {
            selected: children.length ? children[this.props.selectedOption].props.value : null,
        };
    },
    _onChange(value) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }

        this.setState({
            selected: value,
        });
    },
    render() {
        const options = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                onClick: this._onChange,
                selected: child.props.value === this.state.selected,
            });
        });

        const children = React.Children.toArray(this.props.children);
        const selectedChild = _(children).find((val) => val.props.value === this.state.selected);
        const selectedLabel = selectedChild && selectedChild.props.label || '';

        return (
            <div className='bui-select-parent'>
                <DropdownHolder label={selectedLabel}>
                    {options}
                </DropdownHolder>
            </div>
        );
    },
});

const Option = React.createClass({
    propTypes: {
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]).isRequired,
        //Provided by parent
        onClick: React.PropTypes.func.isRequired,
        selected: React.PropTypes.bool.isRequired,
    },
    _onClick() {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.value);
        }
    },
    render() {
        return (
            <DropdownElement label={this.props.label} onClick={this._onClick} />
        );
    },
});

export default {Select, Option};
