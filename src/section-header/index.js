import React 	  from 'react';
import _		  from 'underscore';
import classNames from 'classnames';

const SectionHeader = React.createClass({
	propTypes: {
        icon: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        desc: React.PropTypes.oneOfType([
        	React.PropTypes.string,
        	React.PropTypes.array,
        ]),
        descType: React.PropTypes.string,
        highlighted: React.PropTypes.bool,
        style: React.PropTypes.func,
    },

    getDefaultProps() {
    	return {
    		descType: 'normal',
    	};
    },

	render() {
		const parentClass = classNames('bui-section-header', {
			'is-highlighted': this.props.highlighted,
		});

		// this.props.descType
		let descIcon = (this.props.descType === 'minor' || this.props.descType === 'major')
			? <i className='desc-icon fa fa-warning' />
			: null ;

		const descClass = classNames('section-desc', {
			'is-minor': this.props.descType === 'minor',
			'is-major': this.props.descType === 'major',
		});

		// this.props.desc
		let descText;
		if (_.isArray(this.props.desc)) {
			descText = _.map(this.props.desc, (string, i) => {
				return (i === this.props.desc.length - 1) ? string : string + ', ' ;
			});
		} else {
			descText = this.props.desc;
		}

		return (
			<div className={parentClass} style={this.props.style}>
				<div className='section-circle'>
					<i className={'section-icon fa ' + this.props.icon} />
				</div>
				<div className='section-text'>
					<p className='section-label'>{this.props.label}</p>
					<p className={descClass}>{descIcon}{descText}</p>
				</div>
			</div>
		);
	},
});

export default SectionHeader;