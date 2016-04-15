import React, { Component } from 'react';
import classNames           from 'classnames';

const BuiInputField = React.createClass({
    propTypes: {
        hint:         React.PropTypes.string,
        value:        React.PropTypes.string,
        icon:         React.PropTypes.string,
        password:     React.PropTypes.bool,
        disabled:     React.PropTypes.bool,
        floatingHint: React.PropTypes.bool,
        fastRemove:   React.PropTypes.bool,
        multiLine:    React.PropTypes.bool, 

        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            value: null,
            fastRemove: false,
        };
    },

    getInitialState() {
        return {
            value: this.props.value,
            focus: false,
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

    clearValue(trigger) {
        if (trigger === true) {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange('');
            }
        }

        this.setState({
            value: '',
        });
    },

    _handleChange(event) {
        if (this.props.multiLine) {
            const $showing = $(this._field);
            const $hidden  = $(this.refs.textareaHiddenRef);
            const $parent  = $(this.refs.parentRef);

            $hidden[0].value = $showing[0].value;
            $parent.css({ height: ($hidden[0].scrollHeight > 28) ? $hidden[0].scrollHeight + 5 + 2 : $hidden[0].scrollHeight + 2 });
            $showing.css({ height: ($hidden[0].scrollHeight > 28) ? $hidden[0].scrollHeight + 5 : $hidden[0].scrollHeight });
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event.target.value);
        }

        this.setState({
            value: event.target.value,
        });
    },

    _handleFocus(e) {
        this.setState({ focus: true });
        if (typeof this.props.onFocus === 'function') this.props.onFocus(e);
    },

    _handleBlur(e) {
        this.setState({ focus: false });
        if (typeof this.props.onBlur === 'function') this.props.onBlur(e);
    },

    _removeValueAction() {
        if (this.props.multiLine) {
            $(this._field).css({ height: 28 });
            $(this.refs.parentRef).css({ height: 30 });
        }
        this.clearValue(true);
        this.focus();
    },

    render() {
        const parentClass = classNames('bui-input-field', {
            'input-is-textarea': this.props.multiLine,
            'input-is-focused': this.state.focus,
            'input-is-disabled': this.props.disabled,
            'input-has-icon': this.props.icon,
            'input-has-value': this.state.value,
            'input-has-error': this.props.error,
            'input-has-fast-remove': this.props.fastRemove,
        }, this.props.className);

        const icon = (this.props.icon) ? <i className={'input-icon fa ' + this.props.icon} /> : null ;
        const value = this.state.value;

        // this.props.fastRemove
        const fastRemoveIcon = (this.props.fastRemove && this.state.value)
            ? <div className='input-remove-button' onClick={this._removeValueAction}><i className='fa fa-times-circle' /></div>
            : null ;

        const inputType = (this.props.password) ? 'password' : 'text' ;

        const hintClass = classNames('input-text-hint', {
            'hint-is-floating': this.props.floatingHint,
        });

        const props = {
            type: inputType,
            value: value,
            onKeyDown: this.props.onKeyDown,
            onKeyUp: this.props.onKeyUp,
            onKeyPress: this.props.onKeyPress,
            id: this.props.id,
        };

        let renderField;
        if (this.props.multiLine) {
            renderField = (
                <div className='input-text-value'>
                    <textarea {...props} className='textarea-showing' ref={(ref) => this._field = ref} onChange={this._handleChange} onFocus={this._handleFocus} onBlur={this._handleBlur}>
                        {this.props.value}
                    </textarea>
                    <textarea className='textarea-hidden' ref='textareaHiddenRef'></textarea>
                </div>
            );
        } else {
            renderField = (
                <div className='input-text-value'>
                    <input {...props} ref={(ref) => this._field = ref} onChange={this._handleChange} onFocus={this._handleFocus} onBlur={this._handleBlur} />
                </div>
            );
        }

        return (
            <div className={parentClass} style={this.props.style} ref='parentRef'>
                <div className='input-disable-overlay' />
                <div className='input-icon-holder'>{icon}</div>
                {fastRemoveIcon}
                <div className={hintClass}>{this.props.hint}</div>
                {renderField}
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
