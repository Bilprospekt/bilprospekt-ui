import React, { Component } from 'react';
import classNames           from 'classnames';

// Components
import BuiInputField from '../input-field';

const BuiInlineEdit = React.createClass({
	propTypes: {
		string: React.PropTypes.string.isRequired,
	},
	getInitialState() {
		return {
			editing: false,
			string: this.props.string,
		};
	},
	componentDidUpdate() {
		if (this.state.editing) {
			const $el = $(this._editInputField);
			$el.find('input').focus();
		}
	},
	_editString() {
		console.log('Edit String');
		this.setState({ editing: true });
	},
	_deleteString() {
		console.log('Delete String');
	},
	_saveString() {
		console.log('Save String');
		this.setState({ editing: false });
	},
	_cancelEdit() {
		console.log('Cancel Edit');
		this.setState({ editing: false });
	},
	render() {
		const parentClass = classNames('bui-inline-edit-component', {
			'is-editing' : this.state.editing,
		});
		let editString = null;
		let editButtons = null;
		if (this.state.editing) {
			editString = (
				      <BuiInputField ref={(c) => this._editInputField = c} value={this.state.string} icon='fa-pencil' />
			);
			editButtons = (
				<div className='inline-edit-buttons-holder'>
					<i className='inline-edit-button fa fa-check' onClick={this._saveString} />
					<i className='inline-edit-button fa fa-times' onClick={this._cancelEdit} />
				</div>
			);

		} else {
			editString = (
				<p className='p-information'>{this.props.string}</p>
			);
			editButtons = (
				<div className='inline-edit-buttons-holder'>
					<i className='inline-edit-button fa fa-pencil' onClick={this._editString} />
					<i className='inline-edit-button fa fa-trash' onClick={this._deleteString} />
				</div>
			);
		}
		
		return (
			<div className={parentClass}>
				{editString}
				<p className='inline-edit-hover-icon'><i className='inline-edit-button fa fa-pencil' /></p>
				{editButtons}
			</div>
		);
	}
});

module.exports = BuiInlineEdit;
