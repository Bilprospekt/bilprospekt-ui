import React, { Component } from 'react';

const SectionHeader = React.createClass({
	propTypes: {
        icon:  React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        desc:  React.PropTypes.string,
        style: React.PropTypes.func,
    },
	render() {
		return (
			<div className='bui-section-header' style={this.props.style}>
				<div className='section-circle'>
					<i className={'section-icon fa ' + this.props.icon} />
				</div>
				<div className='section-text'>
					<p className='section-label'>{this.props.label}</p>
					<p className='section-desc'>{this.props.desc}</p>
				</div>
			</div>
		);
	},
});

export default SectionHeader;