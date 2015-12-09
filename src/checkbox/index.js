import React, { Component } from 'react';
import classNames from 'classnames';

const BuiCheckbox = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        id: React.PropTypes.string,
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
    _onClick(event) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event, event.target.checked);
        }
    },
    render() {
        const props = {
            className: 'element-checkbox',
            type: 'checkbox',
            disabled: this.props.disabled,
            id: this.props.id,
            checked: this.props.checked,
            readOnly: true,
        };

        const parentClass = classNames('bui-form-element', 'checkbox-type', {
            'element-disabled': this.props.disabled,
            'element-checked': this.props.checked,
        });

        return (
            <div onClick={this._onClick} className={parentClass}>
                <input {...props} />
                <label htmlFor={this.props.id}>
                    <div className='icon' />
                    <span className='element-label'>{this.props.label}</span>
                </label>
            </div>
        );
    }
});

module.exports = BuiCheckbox;
