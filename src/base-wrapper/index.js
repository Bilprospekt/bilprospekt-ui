import React, { Component } from 'react';
import classNames from 'classnames';

const BaseWrapper = React.createClass({
	getDefaultProps() {
		return {
			bigView: false,
		};
	},

	render() {
		const parentClass = classNames('bui-base-wrapper', {
			'big-view': this.props.bigView,
		});

        return (
            <div className={parentClass}>
                {this.props.children}
            </div>
        );
    }
});

export default BaseWrapper;
