import React, { Component } from 'react';
import classNames from 'classnames';

const BuiFormElement = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        onChange: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            checked: false,
            disabled: false,
        };
    },
    getInitialState() {
        return {
            checked: this.props.checked,
        };
    },
    onClick(event) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event, event.target.checked);
        }
    },
    render() {
        const props = {
            className: 'element-toggle',
            type: 'checkbox',
            disabled: this.props.disabled,
            id: this.props.id,
            checked: this.props.checked,
            onClick: this.onClick
        };
        const parentClass = classNames('bui-form-element', 'toggle-type', {
            'element-disabled': this.props.disabled,
            'element-checked': this.props.checked,
        });

        return (
            <div className={parentClass}>
                <input {...props} />
                <label htmlFor={this.props.id}><div className='icon' /> {this.props.label}</label>
            </div>
        );
    }
});

module.exports = BuiFormElement;
