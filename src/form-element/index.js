import React, { Component } from 'react';
import classNames           from 'classnames';

const BuiFormElement = React.createClass({
    propTypes: {
        type:     React.PropTypes.string.isRequired,
        label:    React.PropTypes.string.isRequired,
        id:       React.PropTypes.string.isRequired,
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
    getInitialState() {
        return {
            checked: this.props.checked,
        };
    },
    isChecked() {
        return this.state.checked;
    },
    setChecked(bool) {
        this.setState({checked: bool});
    },
    onClickInput(event) {
        console.log('onckliikk', event.target);
        // if (typeof this.props.onChange === 'function') {
        //     this.props.onChange(event, !this.state.checked);
        // }

        if (!this.props.disabled) {
            this.setState({ checked: !this.state.checked });
        }
    },
    onClickLabel(event) {
        if (!this.props.disabled) {
            this.setState({ checked: !this.state.checked });
        }
    },
    render() {
        // Propfixes
        const checkValue = (this.props.checked || this.state.checked) ? 'checked' : '' ;
        const parentClass = classNames('bui-form-element', {
            'toggle-type'      : (this.props.type === 'toggle'),
            'checkbox-type'    : (this.props.type === 'checkbox'),
            'radio-type'       : (this.props.type === 'radio'),
            'element-disabled' : this.props.disabled,
            'element-checked'  : this.state.checked,
        });
        const formType = (this.props.type === 'toggle') ? 'checkbox' : this.props.type ;

        const props = {
            className: `element-${this.props.type}`,
            type:      formType,
            disabled:  this.props.disabled,
            id:        this.props.id,
            checked:   checkValue,
            value:     this.props.value,
            onClick:    this.onClickInput
        };

        return (
            <div className={parentClass}>
                <input {...props} />
                <label htmlFor={this.props.id}><div className='icon' /> {this.props.label}</label>
            </div>
        );
    }
});

module.exports = BuiFormElement;
