import React, { Component } from 'react';
import _                    from 'underscore';
import classNames           from 'classnames';
import $                    from 'jquery';
import EventUtil from '../helpers/EventUtil.js';

// Components
import BuiInputField from '../input-field';
import BuiActionButton from '../action-button';

const SearchItem = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
    },

    render() {
        return (
            <div className='result-item' onClick={this.props.onClick}>
                <div className='item-type'><i className={'type-icon fa ' + this.props.icon} /></div>
                <div className='item-name'>{this.props.name}</div>
            </div>
        );
    }
});

const Navigation = React.createClass({
    propTypes: {
        links: React.PropTypes.array.isRequired,
        activeLink: React.PropTypes.string,
        searchButton: React.PropTypes.bool,
        logos: React.PropTypes.object,

        searchData: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                val: React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number,
                ]).isRequired,
                name: React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number,
                ]).isRequired,
                type: React.PropTypes.string,
            })
        ),

        maxWidth: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),

        onSearchItemClick: React.PropTypes.func,
        onSearchChange: React.PropTypes.func,
        onShowAll: React.PropTypes.func,
        onNavClick: React.PropTypes.func,
    },

    getInitialState() {
        return {
            minimized: false,
            searching: false,
            searchValue: null,
            hidden: false,
        };
    },

    getDefaultProps() {
        return {
            searchButton: false,
            searchData: [],
            maxWidth: 'calc(100vw-220px)',
        }
    },

    componentDidMount() {
        $(window).on('keydown', this._onGlobalKeyDown);
        $(window).on('click', this._onGlobalClick);
    },

    componentWillUnmount() {
        $(window).off('keydown', this._onGlobalKeyDown);
        $(window).off('click', this._onGlobalClick);
    },

    _onGlobalKeyDown(e) {
        if (e.which === 27 && this.state.searching === true) {
            this.closeSearch();
        }
    },

    _onGlobalClick(e) {
        const $target = $(e.target);
        const $holder = $(this.refs.holder);
        if (!($target.is($holder) || $target.parents($holder).is($holder))) {
            this.closeSearch();
        }
    },

    _toggleMenuSize() {
        this.setState({minimized: !this.state.minimized });

        setTimeout(() => {
            EventUtil.triggerEvent('resize');
        }, 100);

        if (typeof this.props.onClick === 'function') {
            this.props.onClick(!this.state.minimized);
        }
    },

    _toggleSearch() {
        if (this.state.searching) {
            this.closeSearch();
        } else {
            this.setState({ searching: true });
            setTimeout(() => {
                this.refs.navSearchRef.focus();
            }, 200);
        }
    },

    closeSearch() {
        if (this.refs.navSearchRef) {
            this.refs.navSearchRef.clearValue();
        }

        this.setState({
            searching: false,
            searchValue: null,
        });
    },

    _onSearchChange(value) {
        if (typeof this.props.onSearchChange === 'function') {
            this.props.onSearchChange(value);
        }

        this.setState({ searchValue: value });
    },

    _searchItemClick(val) {
        if (typeof this.props.onSearchItemClick === 'function') {
            this.props.onSearchItemClick(val);
        }

        this.closeSearch();
    },

    _showAll() {
        if (typeof this.props.onShowAll === 'function') {
            this.props.onShowAll(this.state.searchValue);
        }

        this.closeSearch();
    },

    _onNavClick(link) {
        if (typeof this.props.onNavClick === 'function') {
            this.props.onNavClick(link);
        }

        this.closeSearch();
    },

    render() {

        /*
         * Navigation Links
         */

        const navLinks = _(this.props.links).map((val, index) => {
            const linkRowClass = classNames('link-row', {
                'active-link': (this.props.activeLink && this.props.activeLink === val.link),
            });

            return (
                    <div className={linkRowClass} onClick={this._onNavClick.bind(this, val.link)} key={index}>
                    <i className={`link-icon fa ${val.icon}`} />
                    <p className='link-label'>{val.label}</p>
                </div>
            );
        });

        /*
         * Navigation Seach
         */

        let searchPopupStyle = null;
        if (this.props.maxWidth) {
            searchPopupStyle = ({
                maxWidth: this.props.maxWidth,
            });
        }

        const searchPopupClass = classNames('search-popup-parent', {
            'is-showing': this.state.searching
        });

        const items = _(this.props.searchData).map((val) => {
            const iconChoices = {
                company: 'fa-building',
                car: 'fa-car',
                person: 'fa-user',
            };

            const icon = iconChoices[val.type] || 'fa-question';

            return (
                <SearchItem icon={icon} name={val.name} onClick={this._searchItemClick.bind(this, val)} />
            );
        });

        let searchContentState;
        if (!this.state.searchValue) {
            searchContentState = (
                <div className='popup__empty-state'>
                    <div className='empty-state-content'>
                        <i className='empty-state-icon fa fa-user' />
                        <i className='empty-state-icon fa fa-building' />
                        <i className='empty-state-icon fa fa-briefcase' />
                        <i className='empty-state-icon fa fa-car' />
                        <p className='empty-state-text'>Sök efter<br />organisationsnummer,<br />företagsnamn,<br />registreringsnummer<br />och namn på privatpersoner</p>
                    </div>
                </div>
            );
        } else if (this.state.searchValue && this.props.searchData.length === 0) {
            searchContentState = (
                <div className='popup__empty-state'>
                    <div className='empty-state-content'>
                        <i className='empty-state-icon fa fa-warning' />
                        <p className='empty-state-text'>Inga resultat.</p>
                    </div>
                </div>
            );
        } else {
            searchContentState = (
                <div className='popup__result-state'>
                    {items}
                    <BuiActionButton onClick={this._showAll} label='Visa alla resultat' primary flat />
                </div>
            );
        }

        const keyPress = (e) => {
            if (e.which === 13) {
                this._showAll();
            } else if (e.which === 27) {
                this.closeSearch();
            }
        }

        let navSearch = null;
        if (this.props.searchButton) {
            navSearch = (
                <div className='navigation-search-holder'>
                    <div className='search-button' onClick={this._toggleSearch}>
                        <i className='search-icon fa fa-search' />
                        <p className='search-label'>Snabbsök</p>
                    </div>
                    <div className={searchPopupClass} style={searchPopupStyle}>
                        <div className='popup-holder'>
                            <div className='popup__search-field'>
                                <BuiInputField icon='fa-search' hint='Snabbsök' onChange={this._onSearchChange} value={this.state.searchValue} ref='navSearchRef' onKeyDown={keyPress} />
                            </div>
                            {searchContentState}
                        </div>
                    </div>
                </div>
            );
        }

        /*
         * Navigation Size Toggle Button
         */

         const toggleButtonClass = classNames('fa toggle-icon', {
            'fa-angle-double-left': !this.state.minimized,
            'fa-angle-double-right': this.state.minimized,
         });

         let toggleButtonHintLabel;
         if (!this.state.minimized) {
            toggleButtonHintLabel = 'Förminska menyn';
         } else {
            toggleButtonHintLabel = 'Förstora menyn';
         }

        /*
         * Misc.
         */

        const parentClass = classNames('bui-navigation-holder', {
            'nav-is-minimized': this.state.minimized,
            'nav-is-hidden': this.state.hidden,
        });


        let logotypeBig = null;
        let logotypeSmall = null;

        if (this.props.logos) {
            logotypeBig = this.props.logos.big;
            logotypeSmall = this.props.logos.small;
        }

        return (
            <div ref='holder' className={parentClass}>
                <div className='navigation-logotype'>
                    <div className='logotype-big'>
                        {logotypeBig}
                    </div>
                    <div className='logotype-small'>
                        {logotypeSmall}
                    </div>
                </div>
                {navSearch}
                <div className='navigation-links'>{navLinks}</div>
                <div className='navigation-toggle-button' onClick={this._toggleMenuSize}>
                    <i className={toggleButtonClass} />
                    <div className='toggle-hint'>{toggleButtonHintLabel}</div>
                </div>
            </div>
        );
    }
});

export default Navigation;
