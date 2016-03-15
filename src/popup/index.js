import React, { Component } from 'react';
import _                    from 'underscore';
import $                    from 'jquery';
import classNames           from 'classnames';

// Components
import ActionButton from '../action-button';
import Portal from 'react-portal';

const Popup = React.createClass({
    propTypes: {
        actionLabel: React.PropTypes.string.isRequired,
        closeLabel: React.PropTypes.string.isRequired,
        onAction: React.PropTypes.func.isRequired,
    },

    componentDidMount() {
        $(window).on('resize', this._handleResize);
        $(this.refs.popupParent).on('click', this._onWindowClick);
        this.doAnimation();
    },
    componentWillUnmount() {
        $(window).off('resize', this._handleResize);
        $(this.refs.popupParent).off('click', this._onWindowClick);
    },

    _onWindowClick(e) {
        const $target = $(e.target);
        const $popupRef = $(this.refs.popupRef);
        if (!($target.is($popupRef) || $target.parents().is($popupRef))) {
            this._closePopup();
        }
    },

    doAnimation() {
        const $content = $(this.refs.contentRef);
        const maxHeight = window.innerHeight - (80 + 120); // 120px is header + footer height

        // Puts a max-height on the popup content div to control its height with the overflow property
        $content.css('max-height', maxHeight);

        if ($content.first().prop('scrollHeight') > maxHeight) {
            $content.addClass('is-max-height');
        } else {
            $content.removeClass('is-max-height');
        }

        // Animations
        const $overlay = $(this.refs.overlayRef);
        const $popup = $(this.refs.popupRef);

        setTimeout(() => {
            $overlay.addClass('overlay-animation');
            $popup.addClass('popup-animation');
        }, 10);
    },

    _handleResize(e) {
        this.doAnimation();
    },

    _closePopup() {
        this.props.closePortal();
    },

    _doAction(value) {
        if (typeof this.props.onAction === 'function') {
            this.props.onAction(value);
        }
        this._closePopup();
    },

    render() {
        return (
            <div className='bui-popup-parent' ref='popupParent'>
                <div className='popup-holder'>
                    <div className='popup-center-class'>
                        <div className='popup-center-wrapper'>
                            <div className='popup-wrapper' ref='popupRef'>
                                <div className='popup-header'>{this.props.title}</div>
                                <div className='popup-content' ref='contentRef'>{this.props.children}</div>
                                <div className='popup-footer'>
                <ActionButton primary flat label={this.props.closeLabel} onClick={this._doAction.bind(this, false)} />
                <ActionButton primary flat label={this.props.actionLabel} onClick={this._doAction.bind(this, true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='popup-overlay' ref='overlayRef' />
                </div>
            </div>
        );
    }
});

export default Popup;
