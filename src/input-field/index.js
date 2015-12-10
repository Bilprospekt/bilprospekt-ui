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
            this._field.focus();
        }
    },
    blur() {
        this._field.blur();
    },
    focus() {
        this._field.focus();
    },
    getValue() {
        return this._field.value;
    },
    _handleChange(event) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event.target.value);
        }
        this.setState({ value: event.target.value });
    },
    _handleFocus(e) {
        this.setState({ focus: true });
        if (typeof this.props.onFocus === 'function') this.props.onFocus(e);
    },
    _handleBlur(e) {
        this.setState({ focus: false });
        if (typeof this.props.onBlur === 'function') this.props.onBlur(e);
    },
    render() {
        const parentClass = classNames('bui-input-field', {
            'input-is-focused'  : this.state.focus,
            'input-is-disabled' : this.props.disabled,
            'input-has-icon'    : this.props.icon,
            'input-has-value'   : this.state.value,
            'input-has-error'   : this.props.error,
        }, this.props.className);

        const icon = (this.props.icon) ? <i className={'input-icon fa ' + this.props.icon} /> : null ;
        const value = this.state.value;

        const inputType = (this.props.password) ? 'password' : 'text' ;

        const props = {
            type: inputType,
            value: value,
            onKeyDown: this.props.onKeyDown,
            onKeyUp: this.props.onKeyUp,
            onKeyPress: this.props.onKeyPress,
        };

        return (
            <div className={parentClass}>
                <div className='input-disable-overlay' />
                <div className='input-icon-holder'>{icon}</div>
                <div className='input-text-hint'>{this.props.hint}</div>
                <div className='input-text-value'>
                    <input {...props} ref={(ref) => this._field = ref} onChange={this._handleChange} onFocus={this._handleFocus} onBlur={this._handleBlur} />
                </div>
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
