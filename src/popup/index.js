import React, { Component } from 'react';
import _                    from 'underscore';
import $                    from 'jquery';
import classNames           from 'classnames';

// Components
import {ActionButton} from 'bilprospekt-ui';

const Popup = React.createClass({
    propTypes: {       
        button: React.PropTypes.object.isRequired,
        content: React.PropTypes.object.isRequired,
        actionLabel: React.PropTypes.string.isRequired,
        closeLabel: React.PropTypes.string.isRequired,
        display: React.PropTypes.bool,
    },

    getInitialState() {
        return {
            display: false,
            windowHeight: window.innerHeight,
        };
    },

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);
    },

    componentDidUpdate() {
        if (this.state.display) {
            const $content = $(this.refs.contentRef);
            const maxHeight = this.state.windowHeight - (80 + 120); // 120px is header + footer height

            // Puts a max-height on the popup content div to control its height with the overflow property
            $content.css('max-height', maxHeight);

            if ($content.first()[0].scrollHeight > maxHeight) {
                $content.addClass('is-max-height');
            } else {
                $content.removeClass('is-max-height');
            }

            // Animations
            const $overlay = $(this.refs.overlayRef);
            const $popup = $(this.refs.popupRef);

            $overlay.addClass('overlay-animation');
            $popup.addClass('popup-animation');
        }
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    },

    _handleResize(e) {
        this.setState({ windowHeight: window.innerHeight });
    },

    _openPopup() {
        this.setState({ display: true });
    },

    _closePopup() {
        this.setState({ display: false });
    },

    render() {
        const popupContentClass = classNames('popup-content', {
            'is-max-height': $(this.refs.contentRef).first().height() > this.state.windowHeight - (80 + 120),
        });

        let popupContent = null;
        if (this.state.display) {
            popupContent = (
                <div className='popup-holder'>
                    <div className='popup-center-class'>
                        <div className='popup-center-wrapper'>
                            <div className='popup-wrapper' ref='popupRef'>
                                <div className='popup-header'>{this.props.title}</div>
                                <div className={popupContentClass} ref='contentRef'>{this.props.content}</div>
                                <div className='popup-footer'>
                                    <ActionButton primary flat label={this.props.closeLabel} onClick={this._closePopup} />
                                    <ActionButton primary flat label={this.props.actionLabel} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='popup-overlay' ref='overlayRef' />
                </div>
            );
        }

        return (
            <div className='bui-popup-parent' ref='popupParent'>
                <div onClick={this._openPopup}>{this.props.button}</div>
                {popupContent}
            </div>
        );
    }
});

export default Popup;
