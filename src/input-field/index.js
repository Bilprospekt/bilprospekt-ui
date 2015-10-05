import React, { Component } from 'react';
import classNames           from 'classnames';

const BuiInputField = React.createClass({
    propTypes: { 
        hint:     React.PropTypes.string,
        bgcolor:  React.PropTypes.string,
        value:    React.PropTypes.string,
        icon:     React.PropTypes.string,
        password: React.PropTypes.bool,
        disabled: React.PropTypes.bool,

        onChange: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            value:   null,
        };
    },
    getInitialState() {
        return { 
            value: this.props.value,
            focus: false
        };
    },
    componentDidMount() {
        if (this.props.focus) {
            this.refs.field.getDOMNode().focus();
        }
    },
    _handleChange(event) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event.target.value);
        }
        this.setState({ value: event.target.value });
    },
    _handleFocus() {
        this.setState({ focus: true });
    },
    _handleBlur() {
        this.setState({ focus: false });
    },
    render() { 
        const parentClass = classNames('bui-input-field', {
            'input-is-focused'  : this.state.focus,
            'input-is-disabled' : this.props.disabled,
            'input-has-icon'    : this.props.icon,
            'input-has-value'   : this.state.value,
            'input-has-error'   : this.props.error,
        });

        const icon = (this.props.icon) ? <i className={'input-icon fa ' + this.props.icon} /> : null ;
        const value = this.state.value;

        const inputType = (this.props.password) ? 'password' : 'text' ;

        const props = {
            type: inputType,
            value: value,
        };

        return (
            <div className={parentClass}>
                <div className='input-disable-overlay' />
                <div className='input-icon-holder'>{icon}</div>
                <div className='input-text-hint'>{this.props.hint}</div>
                <div className='input-text-value'><input ref='field' {...props} onChange={this._handleChange} onFocus={this._handleFocus} onBlur={this._handleBlur} /></div>
                <div className='input-underlines'>
                    <div className='input-underline-blur' />
                    <div className='input-underline-focus' />
                </div>
                <div className='input-text-error'>{this.props.error}</div>
            </div>
        );
    }
});

module.exports = BuiInputField;