import React from 'react';

const Chips = React.createClass({
    propTypes: {
        label: React.PropTypes.node.isRequired,
        onRemoveClick: React.PropTypes.func,
    },
    render() {
        return (
            <div className='bui-chips'>
                <span className='chips-label'>{this.props.label}</span>
                <i className='fa fa-times-circle chips-icon' onClick={this.props.onRemoveClick} />
            </div>
        );
    }
});

export default Chips;
