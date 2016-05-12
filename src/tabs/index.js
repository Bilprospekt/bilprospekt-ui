import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import _                    from 'underscore';
import $                    from 'jquery';
import classNames           from 'classnames';

// Components
import {DropdownHolder, DropdownElement} from '../drop-down-menu';

const Tabs = React.createClass({
    propTypes: {
        labels: React.PropTypes.array.isRequired,
        selectedTab: React.PropTypes.number,
    },

    getInitialState() {
        return {
            selectedTab: this.props.selectedTab,

            initialRun: true,
            holderWidth: undefined,
            extraSpace: 100,
            showingTabs: [],
            hiddenTabs: [],
        };
    },

    getDefaultProps() {
        return {
            selectedTab: 0,
        };
    },

    componentWillReceiveProps(nextProps) {

        // 
        // Fix so you can select something that is in the overflow dropdown!
        // 

        if (nextProps.selectedTab != this.state.selectedTab) {
            this._changeTab(nextProps.selectedTab, 'showing');
            this.setState({ selectedTab: nextProps.selectedTab });
        }
    },

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);

        // Call for initial selection position
        this._changeTab(this.state.selectedTab, 'showing');

        // Run _handleResize() for initial check
        this._handleResize();
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    },

    _handleResize(e) {
        this._nestTabs();
    },

    _nestTabs() {
        // Variables
        const $holder = $(this.refs.tabsHolderRef);
        const holderWidth = $holder.outerWidth() - 40;
        const extraSpace = this.state.extraSpace;
        let childrenWidth = 0;
        let hiddenChildrenWidth = 0;
        let childrenShowing = [];
        let childrenHidden = this.state.hiddenTabs;

        if (this.state.initialRun) {
            _.each(this.props.labels, (label, index) => {
                const $label = $(this.refs[`buttonRef${index}`]);
                const labelData = [$label[0].innerHTML, index];
                childrenWidth += $label.outerWidth(true);

                if ((childrenWidth + extraSpace) > holderWidth) {
                    childrenHidden.push(labelData);
                    $label.css({ display: 'none' });
                } else {
                    childrenShowing.push(labelData);
                    $label.css({ display: 'block' });
                }
            });
        } else {
            _.each(this.state.showingTabs, (tab, index) => {
                const $tab = $(this.refs[`buttonRef${index}`]);
                const tabData = [$tab[0].innerHTML, index];
                childrenWidth += $tab.outerWidth(true);

                if ((childrenWidth + extraSpace) > holderWidth) {
                    $tab.css({ display: 'none' });
                    childrenHidden.push(tabData);
                } else {
                    childrenShowing.push(tabData);
                    $tab.css({ display: 'block' });
                }
            });

            _.each(childrenHidden, (hiddenTab, dropdownIndex) => {
                console.log('hiddenTab', hiddenTab);
                const $hiddenTab = $(this.refs[`buttonRef${hiddenTab[1]}`]);

                hiddenChildrenWidth += $hiddenTab.outerWidth(true);
                console.log('hiddenChildrenWidth', hiddenChildrenWidth);
                console.log('free space', (holderWidth - (childrenWidth + extraSpace)));

                if (hiddenChildrenWidth < (holderWidth - (childrenWidth + extraSpace))) {
                    console.log('!!!');
                    console.log('dropdownIndex', dropdownIndex);
                    
                    const newShowingTab = childrenHidden.splice(dropdownIndex, 1);

                    childrenShowing.push(hiddenTab);
                    $hiddenTab.css({ display: 'block' });
                }
            });
        }

        console.log('childrenShowing', childrenShowing);
        console.log('childrenHidden', childrenHidden);

        this.setState({
            showingTabs: childrenShowing,
            hiddenTabs: childrenHidden,
            holderWidth: holderWidth,
            initialRun: false,
        });
    },

    _changeTab(index, labelStatus, dropdownIndex) {
        if (labelStatus === 'showing') {
            // Call for animation
            const $button = $(this.refs[`buttonRef${index}`]);
            this._animateTab($button.outerWidth(), $button.position().left);

            if (typeof this.props.onChange === 'function') {
                this.props.onChange(index);
            }

            this.setState({ selectedTab: index });
        } else if (labelStatus === 'hidden') {
            console.log('///////////////');
            console.log('you selected tab nr', index);
            const showingTabs = this.state.showingTabs.reverse();
            const $selectedLabel = $(this.refs[`buttonRef${index}`]);
            let labelsWidth = 0;
            let labelsToSwitch = [];
            let childrenShowing = this.state.showingTabs;
            let childrenHidden = this.state.hiddenTabs;
            let stopEach = false;

            // for (var i = this.state.showingTabs.length - 1; i >= 0; i--) {
            _.each(showingTabs, (tab, i) => {    
                console.log(i, tab);
                // Handle widths
                const $label = $(this.refs[`buttonRef${tab[1]}`]);
                labelsWidth += $label.outerWidth(true) + 1;

                // Handle label data
                const labelData = [$label[0].innerHTML, tab[1]];
                labelsToSwitch.push(labelData);

                if (labelsWidth >= $selectedLabel.outerWidth(true) && !stopEach) {
                    stopEach = true;

                    // Remove labels from state and hide them
                    _.each(labelsToSwitch, (label) => {
                        childrenShowing.pop();
                        childrenHidden.push(label);
                        $(this.refs[`buttonRef${label[1]}`]).css({ display: 'none' });
                    });
                    // Add the selected label to the correct state and show it
                    childrenHidden.splice(dropdownIndex, 1);
                    childrenShowing.push([$selectedLabel[0].innerHTML, index]);
                    $selectedLabel.css({ display: 'block' });

                    // Update selected tab
                    this._changeTab(index, 'showing');
                }
            });

            console.log('childrenShowing', childrenShowing);
            console.log('childrenHidden', childrenHidden);

            this.setState({
                showingTabs: childrenShowing,
                hiddenTabs: childrenHidden,
            });
        }
    },

    _animateTab(width, left) {
        const $tab = $(this.refs.tabRef);
        $tab.animate({
            width: width,
            left: left,
        }, 175, 'swing');
    },

    render() {
        const showingTabs = _(this.props.labels).map((label, index) => {
            const buttonClass = classNames('menu-labels__button', {
                'button-selected': (index === this.state.selectedTab),
            });

            return (
                <div key={index} className={buttonClass} onClick={this._changeTab.bind(this, index, 'showing')} ref={'buttonRef' + index}>
                    {label}
                </div>
            );
        });

        let hiddenTabs = null;
        if (this.state.hiddenTabs.length > 0) {
            const dropdownLabels = _(this.state.hiddenTabs).map((label, index) => {
                return <DropdownElement key={index} label={label[0]} onClick={this._changeTab.bind(this, label[1], 'hidden', index)} />
            });
            hiddenTabs = (
                <DropdownHolder label='Mer'>
                    {dropdownLabels}
                </DropdownHolder>
            );
        }

        return (
            <div className='bui-tabs-holder'>
                <div className='tabs-holder__menu-labels' ref='tabsHolderRef'>
                    {showingTabs}
                    {hiddenTabs}
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
