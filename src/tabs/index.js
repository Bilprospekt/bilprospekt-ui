import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _                    from 'underscore';
import $                    from 'jquery';
import classNames           from 'classnames';

// Components
import {DropdownHolder, DropdownElement} from '../drop-down-menu';
import {DatePicker} from 'bilprospekt-ui';

const Tabs = React.createClass({
    propTypes: {
        labels: React.PropTypes.array.isRequired,
        selectedTab: React.PropTypes.number,
    },

    getInitialState() {
        return {
            windowWidth: window.innerWidth,
            tabsParentWidth: 0,
            tabsChildrenWidth: 0,
            activeTabs: null,
            hiddenTabs: null,
            bonusSpace: 100,

            selectedTab: this.props.selectedTab,
        };
    },

    getDefaultProps() {
        return {
            selectedTab: 0,
        };
    },

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);

        // Call for initial position
        this._changeTab(this.state.selectedTab);

        // Width
        let tabsWidth = 0;
        let tabsArray = [];
        _(this.props.labels).each((label, index) => {
            const tabButton = $(this.refs['buttonRef' + index]);
            tabsWidth += tabButton[0].getBoundingClientRect().width;
            tabsArray.push(tabButton);
        });

        this._nestTabs($(this.refs.tabsHolderRef).width(), tabsWidth, tabsArray);

        this.setState({ 
            tabsParentWidth: $(this.refs.tabsHolderRef).width(),
            tabsChildrenWidth: tabsWidth,
            activeTabs: tabsArray, 
        });
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    },

    _handleResize(e) {
        this._nestTabs($(this.refs.tabsHolderRef).width(), this.state.tabsChildrenWidth, this.state.activeTabs);

        this.setState({ 
            windowWidth: window.innerWidth,
            tabsParentWidth: $(this.refs.tabsHolderRef).width(),
        });
    },

    _nestTabs(pWidth, cWidth, vTabs) {

        /*
         * pWidth = Tabs Parent Width
         * cWidth = Tab Buttons Total Width
         * vTabs = Visible Tabs
         */

        //console.log('parentWidth', pWidth, 'childrenWidth', cWidth);

        let tabArea = pWidth - this.state.bonusSpace;
        let mappedTabs = 0;
        let mappedTabsWidth = 0;
        let $currentTab;
        let hideArray;
        let showArray = [];

        // Checks if the tabs are bigger than the holder
        if (cWidth > tabArea) {
            // Maps through the currently active tabs
            _(vTabs).each((tab, index) => {
                $currentTab = $(this.refs['buttonRef' + index]);
                mappedTabs += 1;
                // If the currently mapped tab's width overflow the parent's width
                if ((mappedTabsWidth + $currentTab[0].getBoundingClientRect().width) > tabArea) {
                    console.log('bigger on tab nr. ', mappedTabs);
                    $currentTab.hide();

                    // Checks for remaining tabs and adds them to hideArray
                    if (index <= vTabs.length) {
                        hideArray = vTabs.slice(index, vTabs.length);
                    }

                    this.setState({ 
                        hiddenTabs: hideArray,
                        tabsChildrenWidth: mappedTabsWidth, 
                    });

                    // Display dropdown button for hidden tabs

                // Else just add it to the total width
                } else {
                    //console.log('roflmao');
                    mappedTabsWidth += $currentTab[0].getBoundingClientRect().width;
                    showArray.push($currentTab);                    
                }
            });

            console.log('showArray', showArray);
            this.setState({ activeTabs: showArray });

        } else if (tabArea > cWidth && this.state.hiddenTabs) {
            //if ()
            console.log('there are', this.state.hiddenTabs.length, 'hidden tab(s)');
        }
    },

    _changeTab(index) {
        // Call for animation
        const $button = $(this.refs['buttonRef' + index]);
        this._animateTab($button.outerWidth(), $button.position().left);

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(index);
        }

        this.setState({ selectedTab: index });
    },

    _animateTab(width, left) {
        const $tab = $(this.refs.tabRef);
        $tab.animate({
            width: width,
            left: left,
        }, 175, 'swing');
    },

    render() {
        const labels = _(this.props.labels).map((label, index) => {
            const buttonClass = classNames('menu-labels__button', {
                'button-selected': (index === this.state.selectedTab),
            });

            return (
                <div key={index} className={buttonClass} onClick={this._changeTab.bind(this, index)} ref={'buttonRef' + index}>
                    {label}
                </div>
            );
        });

        let hiddenLabelsHolder = null;
        if (this.state.hiddenTabs) {
            const hiddenLabels = _(this.state.hiddenTabs).map((label, index) => {
                return <DropdownElement key={index} label={label[0].innerText} />;
            }); 
            hiddenLabelsHolder = <DropdownHolder label='Mer' orientation='right'>{hiddenLabels}</DropdownHolder>;
        }

        return (
            <div className='bui-tabs-holder'>
                <div className='tabs-holder__menu-labels' ref='tabsHolderRef'>
                    {labels}
                    {hiddenLabelsHolder}
                    <div className='menu-labels__tab' ref='tabRef' />
                </div>
                <div className='tabs-holder__tab-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default Tabs;
