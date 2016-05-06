import React from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import {DropdownHolder, DropdownElement} from '../drop-down-menu';

const Select = React.createClass({
    propTypes: {
      //The option that should be selected per default
      defaultSelectedValue: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      onChange: React.PropTypes.func,
      disabled: React.PropTypes.bool,
    },
    getDefaultProps() {
        return {
            defaultSelectedValue: null,
            disabled: false,
        };
    },
    getInitialState() {
        const children = React.Children.toArray(this.props.children);
        return {
            selected: children.length ? (this.props.defaultSelectedValue || children[0].props.value) : null,
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

        const parentClass = classNames('bui-select-parent', {
            'is-disabled': this.props.disabled,
        });

        const children = React.Children.toArray(this.props.children);
        const selectedChild = _(children).find((val) => val.props.value === this.state.selected);
        const selectedLabel = selectedChild && selectedChild.props.label || '';

        return (
            <div className={parentClass}>
                <DropdownHolder disabled={this.props.disabled} label={selectedLabel}>
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
        label: React.PropTypes.string.isRequired,
        //Provided by parent
        onClick: React.PropTypes.func,
        selected: React.PropTypes.bool,
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
