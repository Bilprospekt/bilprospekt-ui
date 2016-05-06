import React from 'react';

const Chips = React.createClass({
    propTypes: {
        label: React.PropTypes.node.isRequired,
        onRemoveClick: React.PropTypes.func,
    },

    _onClick() {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick();
        }
    },

    render() {
        return (
            <div className='bui-chips'>
                <span className='chips-label'>{this.props.label}</span>
                <i className='fa fa-times-circle chips-icon' onClick={this._onClick.bind(this, this.props.onClick)} />
            </div>
        );
    }
});

export default Chips;
