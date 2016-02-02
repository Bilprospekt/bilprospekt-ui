import React, { Component } from 'react';
import _                    from 'underscore';
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

    _changeTab(index) {
        this.setState({ selectedTab: index });

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(index);
        }
    },

    componentDidUpdate() {
        const $tab = $(this.refs.tabRef);
        $tab.animate({
            left: (this.state.selectedTab) * 120
        }, 225, 'swing');
    },

    render() {
        const labels = _(this.props.labels).map((label, index) => {
            if (index === this.state.selectedTab) {
                return <div className='menu-labels__button button-selected' onClick={this._changeTab.bind(this, index)}>{label}</div>;
            } else {
                return <div className='menu-labels__button' onClick={this._changeTab.bind(this, index)}>{label}</div>;
            }
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
