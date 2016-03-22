import React, { Component } from 'react';
import $                    from 'jquery';

// Components
import ActionButton from '../action-button';
import Portal from 'react-portal';

const Popup = React.createClass({
    propTypes: {
        message:    React.PropTypes.string,
        header:     React.PropTypes.string, 
        status:     React.PropTypes.string,
        isOpenedBy: React.PropTypes.node,
        loeader:    React.PropTypes.bool,     
    },

    getDefaultProps() {
        return {
            status: 'info',
            loader: false,
        };
    },

    _animateSnackbar() {
        const $snackbar = $(this.refs.snackbar);

        const sHeight = $snackbar.outerHeight();
        const sWidth  = $snackbar.outerWidth();
        
        $snackbar.css({
            left: '50%',
            marginLeft: -(sWidth / 2),
        });

        setTimeout(() => {
            $snackbar.addClass('snackbar-fadein-animation');
        }, 10);
    },

    _showSnackbar() {
        this.refs.snackbarPortal.openPortal();
        this._animateSnackbar();
    },

    _closeSnackbar() {
        this.refs.snackbarPortal.closePortal();
    },

    render() {
        // this.props.children & this.props.message & this.props.loader
        let snackbarContent = null;
        if (this.props.children) {
            snackbarContent = this.props.children;
        } else if (this.props.message) {
            snackbarContent = <p className='snackbar-message'>{this.props.message}</p>;
        } else if (this.props.loader) {
            snackbarContent = <p className='snackbar-message'>Build Loader for Snackbar</p>;
        }

        // this.props.header
        let snackbarHeader = (this.props.header)
            ? <p className='snackbar-header'>{this.props.header}</p>
            : null ;

        // this.props.status
        let snackbarStatusIcon = null;
        if (this.props.status === 'loading') {
            snackbarStatusIcon = <i className='fa fa-clock snackbar-status-icon status-loading' />;
        } else if (this.props.status === 'warning') {
            snackbarStatusIcon = <i className='fa fa-warning snackbar-status-icon status-warning' />;
        } else if (this.props.status === 'success') {
            snackbarStatusIcon = <i className='fa fa-check snackbar-status-icon status-success' />;
        } else if (this.props.status === 'info') {
            snackbarStatusIcon = <i className='fa fa-info snackbar-status-icon status-info' />;
        }

        return (
            <div className='bui-snackbar-parent' style={this.props.style}>
                {React.cloneElement(this.props.isOpenedBy, {
                    onClick: this._showSnackbar,
                })}
                <Portal closeOnEsc ref='snackbarPortal'>
                    <div className='bui-snackbar-box' ref='snackbar'>
                        <div className='snackbar-left-area'>
                            <div className='snackbar-icon'>
                                {snackbarStatusIcon}
                            </div>
                            <div className='snackbar-content'>
                                {snackbarHeader}
                                {snackbarContent}
                            </div>
                        </div>
                        <div className='snackbar-right-area'>
                            <i className='fa fa-close snackbar-close-icon' onClick={this._closeSnackbar} />
                        </div>
                    </div>
                </Portal>
                
            </div>
        );
    }
});

export default Popup;
