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

            hiddenLabels: [],
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
        window.addEventListener('resize', this._nestTabs);

        // Call for initial selection position
        this._changeTab(this.state.selectedTab);

        // Run _handleResize() for initial check
        this._nestTabs();
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this._nestTabs);
    },

    _nestTabs(e) {
        // Variables
        const $holder = $(this.refs.tabsHolderRef);
        const holderWidth = $holder.outerWidth() - (40 + 100); // 40 is padding, 100 is dropdown button
        let labelsWidth = 0;
        let newHiddenLabels = [];

        _.map(this.props.labels, (button, i) => {
          const buttonRef = $(this.refs[`buttonRef${i}`]);
          labelsWidth += buttonRef.outerWidth(true);

          if (labelsWidth > holderWidth) {
            buttonRef.hide();
            newHiddenLabels.push([buttonRef[0].innerHTML, i]);

            if (this.state.selectedTab >= i) {
              this._highlightHiddenTabsHolder();
            }
          } else {
            buttonRef.show();

            if (this.state.selectedTab === i) {
              this._animateTab(buttonRef.outerWidth(), buttonRef.position().left);
            }
          }
        });
        
        this.setState({ hiddenLabels: newHiddenLabels });
    },

    _changeTab(index) {
        // Call for animation
        const $button = $(this.refs[`buttonRef${index}`]);

        if ($button.css('display') === 'none') {
          this._highlightHiddenTabsHolder();
        } else {
          this._animateTab($button.outerWidth(), $button.position().left);
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(index);
        }

        this.setState({
          selectedTab: index,
        });
    },

    _highlightHiddenTabsHolder() {
      const $tabsHolder = $(ReactDOM.findDOMNode(this.refs.holderRef));
      this._animateTab($tabsHolder.outerWidth(), $tabsHolder.position().left);
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
                <div key={index} className={buttonClass} onClick={this._changeTab.bind(this, index)} ref={'buttonRef' + index}>
                    {label}
                </div>
            );
        });


        const hiddenElements = _(this.state.hiddenLabels).map((label, index) => {
          return <DropdownElement key={'DropdownElementKey' + index} label={label[0]} onClick={this._changeTab.bind(this, label[1])} />
        });

        const hiddenTabs = (this.state.hiddenLabels.length > 0)
          ? <DropdownHolder label='Mer' ref='holderRef'>{hiddenElements}</DropdownHolder>
          : null ;

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
