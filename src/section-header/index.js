import React 	  from 'react';
import classNames from 'classnames';

const SectionHeader = React.createClass({
	propTypes: {
        icon:  		 React.PropTypes.string.isRequired,
        label: 		 React.PropTypes.string.isRequired,
        desc:  		 React.PropTypes.string,
        highlighted: React.PropTypes.bool,
        style: 		 React.PropTypes.func,
    },
	render() {
		const parentClass = classNames('bui-section-header', {
			'is-highlighted': this.props.highlighted,
		});

		return (
			<div className={parentClass} style={this.props.style}>
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