import React, { Component } from 'react';
import classNames           from 'classnames';

const ViewWrapper = React.createClass({
    propTypes: {
        cards: React.PropTypes.bool,
    },
    getDefaultProps() {
        return {
            cards: false,
        };
    },
    render() {
        const parentClass = classNames('bui-view-wrapper', {
            'card-view': this.props.cards,
        });

        return (
            <div className={parentClass}>
                {this.props.children}
            </div>
        );
    }
});

export default ViewWrapper;
