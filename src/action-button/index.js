import React, { Component } from 'react';
import classNames           from 'classnames';
import _ from 'underscore';

const ActionButton = React.createClass({
    propTypes: {
        label: React.PropTypes.node.isRequired,
        primary: React.PropTypes.bool,
        style: React.PropTypes.object,
        selected: React.PropTypes.bool,
        flat: React.PropTypes.bool,
        toggle: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            primary: false,
            selected: false,
            flat: false,
            toggle: false,
        };
    },

    render() {
        const buttonClass = classNames('bui-action-button', this.props.className, {
            'bui-is-primary': this.props.primary,
            'bui-is-secondary': (!this.props.primary && !this.props.toggle),
            'bui-is-selected': this.props.selected,
            'bui-is-toggle': this.props.toggle,
            'bui-is-flat': this.props.flat,
        });

        const props = this.props;

        return (
            <button {..._(props).omit(['label', 'primary', 'selected', 'toggle', 'flat'])} className={buttonClass}>
                {this.props.label}
            </button>
        );
    }
});

export default ActionButton;
