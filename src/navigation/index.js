import React, { Component } from 'react';
import _                    from 'underscore';
import classNames           from 'classnames';

// Components
import BuiInputField from '../input-field';
import BuiActionButton from '../action-button';

const SearchItem = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
    },

    render() {
        return (
            <div className='result-item'>
                <div className='item-type'><i className={'type-icon fa ' + this.props.icon} /></div>
                <div className='item-name'>{this.props.name}</div>
            </div>
        );
    }
});

const Navigation = React.createClass({
    propTypes: {
        links: React.PropTypes.array.isRequired,
        searchButton: React.PropTypes.bool,
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
        }
    },

    _toggleMenuSize() {
        this.setState({ minimized: !this.state.minimized });
        this._closeSearch();
    },

    _toggleSearch() {
        if (this.state.searching) {
            this._closeSearch();
        } else {
            this.setState({ searching: true });
        }
    },

    _closeSearch() {
        this.setState({
            searching: false,
            searchValue: null,
        });
    },

    _onSearchChange(value) {
        this.setState({ searchValue: value });
    },

    render() {

        console.log('search value', this.state.searchValue);

        /*
         * Navigation Links
         */

        const navLinks = _(this.props.links).map((val, index) => {
            return (
                <div className='link-row' key={index}>
                    <i className={'link-icon fa ' + val[1]} />
                    <p className='link-label'>{val[0]}</p>
                </div>
            );
        });

        /*
         * Navigation Seach
         */

        const searchPopupClass = classNames('search-popup-parent', {
            'is-showing': this.state.searching
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
                        <p className='empty-state-text'>Snabbsök i Bilprospekt<br />efter vad du söker</p>
                    </div>
                </div>
            );
        } else {
            searchContentState = (
                <div className='popup__result-state'>
                    <SearchItem icon='fa-user' name='Niklas Silfverström' />
                    <SearchItem icon='fa-user' name='Viktor Silfverström' />
                    <SearchItem icon='fa-building' name='Silfverströms Bilar' />
                    <SearchItem icon='fa-briefcase' name='Silfverström AB' />
                    <SearchItem icon='fa-car' name='VIK 404' />
                    <SearchItem icon='fa-car' name='NIK 007' />
                    <SearchItem icon='fa-user' name='Niklas Silfverström' />
                    <SearchItem icon='fa-user' name='Viktor Silfverström' />
                    <SearchItem icon='fa-building' name='Silfverströms Bilar' />
                    <SearchItem icon='fa-briefcase' name='Silfverström AB' />
                    <BuiActionButton label='Visa alla resultat' primary flat />
                </div>
            );
        }

        let navSearch = null 
        if (this.props.searchButton) {
            navSearch = (
                <div className='navigation-search-holder'>
                    <div className='search-button' onClick={this._toggleSearch}>
                        <i className='search-icon fa fa-search' />
                        <p className='search-label'>Snabbsök</p>
                    </div>
                    <div className={searchPopupClass}>
                        <div className='popup-holder'>
                            <div className='popup__search-field'>
                                <BuiInputField icon='fa-search' onChange={this._onSearchChange} value={this.state.searchValue} />
                                <i className='fa fa-times search-close-button' onClick={this._closeSearch} />
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

        return (
            <div className={parentClass}>
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
