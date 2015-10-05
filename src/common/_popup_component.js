import React, { Component } from 'react';

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
        return (
            <div className='popup-wrapper' ref='parent'>
                <div className='popup-content' ref='popupContent'>
                	<div className='content-title'>{this.props.title}</div>
                	<div className='content-body'>{this.props.children}</div>
                	<div className='content-footer'>
                		<div className='popup-footer-button' onClick={this._hidePopup}>{this.props.yes}</div>
                		<div className='popup-footer-button' onClick={this._hidePopup}>{this.props.no}</div>
                	</div>
                </div>
                <div className='popup-overlay' ref='popupOverlay' onClick={this._hidePopup} />
            </div>
        );
    }
});

module.exports = PopupComponent;