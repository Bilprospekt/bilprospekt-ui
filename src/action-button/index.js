import React, { Component } from 'react';
import classNames           from 'classnames';

const ActionButton = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        primary: React.PropTypes.bool,
        minor: React.PropTypes.bool,
        style: React.PropTypes.object,
        selected: React.PropTypes.bool,
        flat: React.PropTypes.bool,
    },
    getDefaultProps() {
        return {
            primary: false,
            minor:   false,
            selected: false,
            flat: false,
        };
    },
    render() {
        let primaryOrSecondaryClass;
        if (!this.props.minor) {
            primaryOrSecondaryClass = {
                'bui-primary-action-button'   : this.props.primary,
                'bui-secondary-action-button' : !this.props.primary,
            };
        } else {
            primaryOrSecondaryClass = {
                'bui-minor-primary-action-button'   : this.props.primary,
                'bui-minor-secondary-action-button' : !this.props.primary,
            };
        }

        const buttonClass = classNames(primaryOrSecondaryClass, {
            'bui-is-selected': this.props.selected,
            'bui-is-flat': this.props.flat,
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
