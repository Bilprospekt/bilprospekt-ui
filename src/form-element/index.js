import React, { Component } from 'react';
import classNames           from 'classnames';

const BuiFormElement = React.createClass({
    propTypes: {
        type:     React.PropTypes.string.isRequired,
        label:    React.PropTypes.string.isRequired,
        id:       React.PropTypes.string,
        group:    React.PropTypes.string,
        checked:  React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        onChange: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            checked: false,
            disabled: false,
        };
    },
    _onClick(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e, !this.props.checked);
        }

    },
    render() {
        // Propfixes
        const checkValue = this.props.checked === true ? 'checked' : '';

        const parentClass = classNames('bui-form-element', {
            'toggle-type'      : (this.props.type === 'toggle'),
            'checkbox-type'    : (this.props.type === 'checkbox'),
            'radio-type'       : (this.props.type === 'radio'),
            'element-disabled' : this.props.disabled,
            'element-checked'  : this.props.checked,
        });
        const formType = (this.props.type === 'toggle') ? 'checkbox' : this.props.type ;

        const props = {
            className: `element-${this.props.type}`,
            type:      formType,
            disabled:  this.props.disabled,
            id:        this.props.id,
            checked:   checkValue,
            value:     this.props.value,
            onClick:   this.props.onClick,
        };

        const formIcon = (this.props.type === 'checkbox' && checkValue === 'checked') ? <i className='fa fa-check element-checkbox-icon' /> : null ;
        return (
            <div className={parentClass} onClick={this._onClick}>
                <input {...props} />
                <label htmlFor={this.props.id}>{formIcon}</label>
                <div className='element-label'>{this.props.label}</div>
            </div>
        );
    }
});

module.exports = BuiFormElement;
