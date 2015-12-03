import React, { Component } from 'react';
import _ from 'underscore';

var PopupComponent = React.createClass({
    componentDidMount() {
        var that = this;
        setTimeout(function(){
            $(that.refs.popupContent.getDOMNode()).addClass('fade-in');
            $(that.refs.popupOverlay.getDOMNode()).addClass('fade-in');
        }, 1);
    },
    _hidePopup() {
        $(this.refs.parent.getDOMNode()).remove();
    },
    render() {
        console.log(this.props);
        return (
            <div className='popup-wrapper' ref='parent'>
                <div className='popup-content' ref='popupContent'>
                    <div className='content-title'>{this.props.title}</div>
                    <div className='content-body'>{this.props.children}</div>
                    <div className='content-footer'>
                        {this.props.footer.components}
                        _(this.props.footer.components).map((component) => {
                            return component;
                        });
                    </div>
                </div>
                <div className='popup-overlay' ref='popupOverlay' onClick={this._hidePopup} />
            </div>
        );
    }
});

module.exports = PopupComponent;