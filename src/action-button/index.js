import React, { Component } from 'react';
import classNames           from 'classnames';

const ActionButton = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        primary: React.PropTypes.bool,
        style: React.PropTypes.object,
        selected: React.PropTypes.bool,
        flat: React.PropTypes.bool,
        toggle: React.PropTypes.bool,
        linkTo: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            primary: false,
            selected: false,
            flat: false,
            toggle: false,
        };
    },

    _onClick() {
        if (this.props.linkTo) {
            window.open(this.props.linkTo, '_self')
        }
    },

    render() {
        const buttonClass = classNames('bui-action-button', {
            'bui-is-primary': this.props.primary,
            'bui-is-secondary': (!this.props.primary && !this.props.toggle),
            'bui-is-selected': this.props.selected,
            'bui-is-toggle': this.props.toggle,
            'bui-is-flat': this.props.flat,
        });

        const props = this.props;

        return (
            <div {...props} className={buttonClass} onClick={this._onClick}>
                {this.props.label}
            </div>
        );
    }
});

export default ActionButton;
