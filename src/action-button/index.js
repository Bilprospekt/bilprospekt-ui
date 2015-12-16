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
        const buttonClass = classNames('bui-action-button', {
            'bui-is-primary': this.props.primary,
            'bui-is-secondary': !this.props.primary,
            'bui-is-selected': this.props.selected,
            'bui-is-flat': this.props.flat,
            'bui-is-toggle': this.props.toggle,
        });

        const props = this.props;
        return (
            <div {...props} className={buttonClass}>
                {this.props.label}
            </div>
        );
    }
});

export default ActionButton;
