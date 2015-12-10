import React from 'react';
import _ from 'underscore';

const RadioButton = React.createClass({
    propTypes: {
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]).isRequired,
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool,

        //Set by radioGroup
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    _onChange() {
        this.props.onChange(this.props.value);
    },
    render() {
        return (
            <div className='bui-radio bui-form-element radio-type'>
                <input disabled={this.props.disabled} checked={this.props.checked} onChange={this._onChange} type="radio" name={this.props.name} />
                <label>
                    <span className="element-label">{this.props.label}</span>
                </label>
            </div>
        );
    },
});


const RadioButtonGroup = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        onChange: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            name: _.uniqueId('bilprospekt-ui-radio'),
        };
    },
    _onRadioChange(value) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }
    },
    render() {
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {name: this.props.name, onChange: this._onRadioChange});
        });

        return (
            <div className='bui-radio-button-group'>
                {children}
            </div>
        )
    },
});

export default {
    RadioButton,
    RadioButtonGroup,
};
