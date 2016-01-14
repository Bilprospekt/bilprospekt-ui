import React from 'react';

const Chips = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
    },
    render() {
        return (
            <div className='bui-chips'>
                <span className='chips-label'>{this.props.label}</span>
                <i className='fa fa-times-circle chips-icon' />
            </div>
        );
    }
});

export default Chips;
