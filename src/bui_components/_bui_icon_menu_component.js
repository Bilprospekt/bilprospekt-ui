import React, { Component } from 'react';
import classNames           from 'classnames';

const BuiIconMenu = React.createClass({
    propTypes() { 
        hint:  React.PropTypes.string
        value: React.propTypes.string
        icon:  React.PropTypes.string
    },
    getInitialState() {
        return { 
            value: this.props.value,
            focus: false
        };
    },
    render() { 
        const parentClass = classNames( 'ui-input-field', {
            'input-with-icon'   : this.props.icon,
            'input-is-focused'  : this.state.focus,
            'input-is-disabled' : this.props.disabled,
            'input-has-value'   : this.state.value,
            'input-has-error'   : this.props.error
        });

        const icon = (this.props.icon) ? <i className={'fa ' + this.props.icon} /> : null ;

        return (
            <div className={parentClass}>
                {icon}
            </div>
        );
    }
});

module.exports = BuiIconMenu;