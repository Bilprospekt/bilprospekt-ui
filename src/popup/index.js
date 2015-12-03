import React, { Component } from 'react';
import _ from 'underscore';

class Popup extends Component {
    componentDidMount() {
        var that = this;
        setTimeout(function(){
            $(that.refs.popupContent).addClass('fade-in');
            $(that.refs.popupOverlay).addClass('fade-in');
        }, 1);
    }

    render() {
        let size = this.props.size || 'medium';
        let headerControls = _(this.props.header.controls).map((control) => control);
        let footerControls = _(this.props.footer.controls).map((control) => control);
        return (
            <div className='popup-wrapper' ref='popupParent'>
                <div className={'popup-content ' + size} ref='popupContent'>
                    <div className='content-header'>
                        <div className='content-title'>{this.props.header.title}</div>
                        {headerControls}
                    </div>
                    <div className='content-body'>{this.props.children}</div>
                    <div className='content-footer'>
                        {footerControls}
                    </div>
                </div>
                <div className='popup-overlay' ref='popupOverlay' onClick={this.props.onClose} />
            </div>
        );
    }
}

module.exports = Popup;
