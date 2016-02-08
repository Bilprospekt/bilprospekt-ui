import React, { Component } from 'react';

const BaseWrapper = React.createClass({
	render() {
        return (
            <div className='bui-base-wrapper'>
                {this.props.children}
            </div>
        );
    }
});

export default BaseWrapper;
