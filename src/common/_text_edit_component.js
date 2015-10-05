import React, { Component } from 'react';

var TextEditComponent = React.createClass({
	getInitialState() {
		return { 
			textValue: this.props.label,
			savedValue: this.props.label,
			showInput: false 
		};
	},
	componentDidMount() {
		var that = this;
		$(document.body).click(function(event) {
			if (that.state.showInput) {
				if ( $(event.target).hasClass('text-edit-popup-field') || $(event.target).parent().hasClass('text-edit-popup-field') || $(event.target).parent().hasClass('save-button') ) {
					// Do nothing
				} else {
					that._cancelInput();
				}
			}
		});	
	},
	componentDidUpdate() {
		if (this.state.showInput) {
			this.refs.textField.getDOMNode().focus();
		}
	},
	_handleChange() {
		this.setState({ textValue: event.target.value });
	},
	_showInput() {
		this.setState({ showInput: true });
		$(this.refs.textField.getDOMNode()).val(this.state.textValue);
	},
	_saveInput() {
		this.setState({ showInput: false, savedValue: this.state.textValue });
		$(this.refs.originValue.getDOMNode()).text(this.state.textValue);
		$(this.refs.textField.getDOMNode()).val(this.state.textValue);
	},
	_cancelInput() {
		this.setState({ showInput: false, textValue: this.state.savedValue  });
		$(this.refs.textField.getDOMNode()).val(this.props.label);
	},
	render() {
		var fieldClass = (this.state.showInput) ? 'text-edit-popup-field field-is-visible' : 'text-edit-popup-field' ;
		return (
			<div className='text-edit-popup-holder'>
				<span ref='originValue' onClick={this._showInput}>{this.props.label}</span>
				<div className={fieldClass}>
					<input type="text" ref='textField' defaultValue={this.props.label} onChange={this._handleChange} />
					<div className='edit-button save-button' onClick={this._saveInput}><i className='fa fa-check' style={{'lineHeight' : this.props.height + 'px'}}/></div>
				</div>
			</div>
		);
	}
});

module.exports = TextEditComponent;