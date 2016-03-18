import React, { Component } from 'react';
import $                    from 'jquery';

// Components
import ActionButton from '../action-button';
import Portal from 'react-portal';

const Popup = React.createClass({
    propTypes: {
        message: React.PropTypes.string.isRequired,
        closeLabel: React.PropTypes.string.isRequired,
    },

    componentDidMount() {
        this.doAnimation();
    },

    doAnimation() {
        const $snackbar = $(this.refs.snackbar);

        setTimeout(() => {
            $snackbar.addClass('snackbar-fadein-animation');
        }, 10);
    },

    _closePopup() {
        this.props.closePortal();
    },

    render() {
        return (
            <div className='bui-snackbar-parent' ref='snackbar'>
                {this.props.message}
                <ActionButton label={this.props.closeLabel} flat primary />
            </div>
        );
    }
});

export default Popup;
