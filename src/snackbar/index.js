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
        loader:     React.PropTypes.bool,
        showTime:   React.PropTypes.number,      
    },

    getInitialState() {
        return  {
            snackbarShowing: false,
        };
    },

    getDefaultProps() {
        return {
            status: 'info',
            loader: false,
            showTime: 5000,
        };
    },

    _animateSnackbar() {
        const $snackbar = $(this.refs.snackbar);

        const sHeight = $snackbar.outerHeight();
        const sWidth  = $snackbar.outerWidth();

        // Handle multiple snackbars
        let newBottomValue = 0;
        $('.bui-snackbar-box').each(function(index) {
            if (index > 0) {
                newBottomValue = 65 * index;
            }
        });

        $snackbar.css({
            bottom: 5 + newBottomValue,
        });

        setTimeout(() => {
            $snackbar.addClass('snackbar-fadein-animation');
        }, 10);
    },

    _showSnackbar() {
        if (!this.state.snackbarShowing) {
            this.refs.snackbarPortal.openPortal();
            this._animateSnackbar();
            this.setState({ snackbarShowing: true });

            setTimeout( this._closeSnackbar, this.props.showTime );
        }
    },

    _closeSnackbar() {
        const _this = this;
        setTimeout(function() {
            _this.refs.snackbarPortal.closePortal();

            let newBottomValue;
            const snackbars = $('.bui-snackbar-box').length;

            if (snackbars > 0) {
                $('.bui-snackbar-box').each(function(index) {
                    newBottomValue = 65 * index;
                    $(this).css({bottom: 5 + newBottomValue});
                });
            }
        }, 1);

        this.setState({ snackbarShowing: false });
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

        // this.props.status
        let snackbarStatusIcon = null;
        if (this.props.status === 'loading') {
            snackbarStatusIcon = <i className='fa fa-clock-o snackbar-status-icon status-loading' />;
        } else if (this.props.status === 'warning') {
            snackbarStatusIcon = <i className='fa fa-warning snackbar-status-icon status-warning' />;
        } else if (this.props.status === 'success') {
            snackbarStatusIcon = <i className='fa fa-check snackbar-status-icon status-success' />;
        } else if (this.props.status === 'info') {
            snackbarStatusIcon = <i className='fa fa-info snackbar-status-icon status-info' />;
        }

        // this.props.isOpenedBy
        let snackbarButton = null;
        if (this.props.isOpenedBy) {
            snackbarButton = React.cloneElement(this.props.isOpenedBy, {
                onClick: this._showSnackbar,
            });
        }

        // this.props.isOpen
        if (this.props.isOpen) {
            this._showSnackbar();
        }

        return (
            <div className='bui-snackbar-parent' style={this.props.style}>
                {snackbarButton}
                <Portal closeOnEsc ref='snackbarPortal'>
                    <div className='bui-snackbar-box' ref='snackbar'>
                        {snackbarStatusIcon}
                        <div className='snackbar-content'>{snackbarContent}</div>
                        <i className='fa fa-close snackbar-close-icon' onClick={this._closeSnackbar} />
                    </div>
                </Portal>
                
            </div>
        );
    }
});

export default Popup;
