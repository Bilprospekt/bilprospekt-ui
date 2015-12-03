import React, { Component } from 'react';
import classNames           from 'classnames';
import _ from 'underscore';

// Components
import Checkbox from '../checkbox'

const DropdownElement = React.createClass({
    propTypes: {
        label:    React.PropTypes.string.isRequired,
        checkbox: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        onClick: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            checkbox: false,
            checkboxChecked: false,
        };
    },
    render() {
        const props = {
            type: 'checkbox',
            label: this.props.label,
            checked: this.props.checkboxChecked,
            disabled: this.props.disabled,
            onClick: this.props.onClick,
        };

        const dropdownElement = (this.props.checkbox)
          ? <Checkbox {...props} />
          : <p onClick={this.props.onClick} className='dropdown-label'>{this.props.label}</p> ;

        const elementClass = classNames('dropdown-element', {
            'is-disabled': this.props.disabled,
        });

        return (
            <div className={elementClass}>
                {dropdownElement}
            </div>
        );
    }
});

const DropdownHolder = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
        icon:  React.PropTypes.string,
        disabled: React.PropTypes.bool,
    },
    getInitialState() {
        return {
            opened: false,
        };
    },
    componentDidUpdate() {
        if (this.state.opened) {
            document.addEventListener('click', this._hideDrop);
        }
    },
    _handleClick() {
        if (!this.props.disabled) {
            this.setState({ opened: true });
        }
    },
    _hideDrop(e) {
        var $el = $(e.target);
        var dontCloseMePleaseClass = '.bui-form-element';
        if ($el.is(dontCloseMePleaseClass) || $el.parents().is(dontCloseMePleaseClass) || $el.children().is(dontCloseMePleaseClass)) {
            return;
        }

        if (this.state.opened) {
            this.setState({ opened: false });
            document.removeEventListener('click', this._hideDrop);
        }
    },
    componentWillUnmount() {
        document.removeEventListener('click', this._hideDrop);
    },
    render() {
        const parentClass = classNames('toolbar-dropdown-holder', {
            'is-open':     this.state.opened,
            'is-disabled': this.props.disabled,
        });

        const labelIcon = <i className={'toolbar-icon fa ' + this.props.icon} />;

        return (
            <div className={parentClass} onClick={this._handleClick}>
                <div className='toolbar-dropdown-holder-label'>
                    {labelIcon}
                    <span className='toolbar-text-label'>{this.props.label}</span>
                    <i className='toolbar-caret fa fa-caret-down' />
                </div>
                <div className='toolbar-dropdown-elements-holder'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

exports.DropdownElement = DropdownElement;
exports.DropdownHolder = DropdownHolder;
