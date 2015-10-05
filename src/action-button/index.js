import React, { Component } from 'react';
import classNames           from 'classnames';

var BuiActionButton = React.createClass({
    propTypes: {
        label:   React.PropTypes.string.isRequired,
        primary: React.PropTypes.bool,
        minor:   React.PropTypes.bool, 
    },
    getDefaultProps() {
        return {
            primary: false,
            minor:   false,
        };
    },
    render() {
        let buttonClass;
        if (!this.props.minor) {
            buttonClass = classNames({
                'bui-primary-action-button'   : this.props.primary,
                'bui-secondary-action-button' : !this.props.primary,
            });
        } else {
            buttonClass = classNames({
                'bui-minor-primary-action-button'   : this.props.primary,
                'bui-minor-secondary-action-button' : !this.props.primary,
            });
        }
        
        return (
            <div className={buttonClass} onClick={this.props.onClick}>
                {this.props.label}
            </div>
        );
    }
});

module.exports = BuiActionButton;