import React, { Component } from 'react';
import _                    from 'underscore';
import $                    from 'jquery';
import classNames           from 'classnames';

// Components
import ActionButton from '../action-button';
import Portal from 'react-portal';

const Popup = React.createClass({
    propTypes: {
        openBy: React.PropTypes.node,
        actionLabel: React.PropTypes.string.isRequired,
        closeLabel: React.PropTypes.string.isRequired,
        onAction: React.PropTypes.func.isRequired,
        contentFullWidth: React.PropTypes.bool,
        openByDefault: React.PropTypes.bool,
    },

    componentWillUnmount() {
        $(window).off('resize', this._handleResize);
        $(this.refs.popupParent).off('click', this._onWindowClick);
    },

    componentDidMount() {
      if (this.props.openByDefault === true) {
        this._openPopup();
      }
    },

    _onWindowClick(e) {
        const $target = $(e.target);
        const $popupRef = $(this.refs.popupRef);
        if (!($target.is($popupRef) || $target.parents().is($popupRef))) {
            this._closePopup();
        }
    },

    _doAnimation() {
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
        this._doAnimation();
    },

    _openPopup() {
        this.refs.popupPortal.openPortal();
        $(window).on('resize', this._handleResize);
        $(this.refs.popupParent).on('click', this._onWindowClick);
        this._doAnimation();
    },

    _closePopup() {
        this.refs.popupPortal.closePortal();
    },

    _doAction(value) {
        if (typeof this.props.onAction === 'function') {
            this.props.onAction(value);
        }
        this._closePopup();
    },

    render() {
        // this.props.contentFullWidth
        const contentClass = classNames('popup-content', {
            'full-width-enabled': this.props.contentFullWidth,
        });

        let openBy = null;
        if (this.props.openBy) {
          openBy = React.cloneElement(this.props.openBy, {onClick: this._openPopup});
        }

        return (
            <div className='bui-popup-parent'>
                {openBy}
                <Portal closeOnEsc ref='popupPortal'>
                    <div className='bui-popup-holder' ref='popupParent'>
                        <div className='popup-center-class'>
                            <div className='popup-center-wrapper'>
                                <div className='popup-wrapper' ref='popupRef'>
                                    <div className='popup-header'>{this.props.title}</div>
                                    <div className={contentClass} ref='contentRef'>{this.props.children}</div>
                                    <div className='popup-footer'>
                                        <ActionButton primary flat label={this.props.closeLabel} onClick={this._doAction.bind(this, false)} />
                                        <ActionButton primary flat label={this.props.actionLabel} onClick={this._doAction.bind(this, true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='popup-overlay' ref='overlayRef' />
                    </div>
                </Portal>
            </div>
        );
    }
});

export default Popup;
