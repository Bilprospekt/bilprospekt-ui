import React, { Component } from 'react';
import _                    from 'underscore';
import $                    from 'jquery';
import classNames           from 'classnames';

const Tabs = React.createClass({
    propTypes: {
        labels: React.PropTypes.array.isRequired,
        selectedTab: React.PropTypes.number,
    },

    getInitialState() {
        return {
            selectedTab: this.props.selectedTab,
        };
    },

    getDefaultProps() {
        return {
            selectedTab: 0,
        };
    },

    componentDidMount() {
        // Call for initial position
        this._changeTab(this.state.selectedTab);
        _.each(this.refs, function(button) {
            console.log('button', button);
        });
    },

    _changeTab(index) {
        this.setState({ selectedTab: index });

        // Call for animation
        const $button = $(this.refs['buttonRef' + index]);
        this._animateTab($button.outerWidth(), $button.position().left);

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(index);
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

        return (
            <div className='bui-tabs-holder'>
                <div className='tabs-holder__menu-labels'>
                    {labels}
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
