import React, { Component } from 'react';
import classNames           from 'classnames';

const Header = React.createClass({
    propTypes: {
        withTabs: React.PropTypes.bool,
    },
    getDefaultProps() {
        return {
            withTabs: false,
        };
    },
    render() {
        const parentClass = classNames('bui-header-holder', {
            'header-with-tabs': this.props.withTabs,
        });

        const props = this.props;
        return (
            <div className={parentClass}>
                <div className='header-main'>
                    <div className='main-left-area'>
                        <div className='path-breadcrumbs'></div>
                        <div className='path-label'>{this.props.pathLabel}</div>
                    </div>
                    <div className='main-right-area'>
                    </div>
                </div>
            </div>
        );
    }
});

export default Header;
