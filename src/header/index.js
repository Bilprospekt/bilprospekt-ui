import React, { Component } from 'react';
import classNames           from 'classnames';
import $                    from 'jquery';

// Components
import BuiInputField from '../input-field';

const Header = React.createClass({
    propTypes: {
        withTabs: React.PropTypes.bool,
        withSearch: React.PropTypes.bool,
    },

    getInitialState() {
        return {
            expandedSearch: false,
        };
    },

    getDefaultProps() {
        return {
            withTabs: false,
            withSearch: false,
        };
    },

    _expandSearch() {
        this.setState({ expandedSearch: true });
        $(this.refs.headerSearchRef).focus();
    },

    _hideSearch() {
        this.setState({ expandedSearch: false });
    },

    render() {
        const parentClass = classNames('bui-header-holder', {
            'header-with-tabs': this.props.withTabs,
        });

        /*
         * Header Search
         */

        const headerSearchClass = classNames('header-search-holder', {
            'is-expanded': this.state.expandedSearch,
        });

        let headerSearch = null;
        if (this.props.withSearch) {
            headerSearch = (
                <div className={headerSearchClass}>
                    <i className='header-icon-button fa fa-search' onClick={this._expandSearch} />
                    <div className='search-field'>
                        <BuiInputField hint='Sök' ref='headerSearchRef' />
                        <i className='fa fa-times search-close-button' onClick={this._hideSearch} />
                    </div>
                </div>
            );
        }

        return (
            <div className={parentClass}>
                <div className='header-main'>
                    <div className='main-left-area'>
                        <div className='path-breadcrumbs'></div>
                        <div className='path-label'>{this.props.pathLabel}</div>
                    </div>
                    <div className='main-right-area'>
                        {headerSearch}
                    </div>
                </div>
            </div>
        );
    }
});

export default Header;
