import React, { Component } from 'react';
import classNames           from 'classnames';

// Components
import BuiInputField   from '../input-field';
import BuiFormElement  from '../form-element';
import BuiActionButton from '../action-button';

const BuiSearchAdder = React.createClass({
	getInitialState() {
		return {
			expanded: false,
			inputValue: null,
		};
	},
	_valueAdded(val) {
		if (val === '') {
			this.setState({ expanded: false });
		} else {
			this.setState({ expanded: true });
		}
		this.setState({ inputValue: val });
	},
	_runAction() {
		console.log('run action');
	},
	_cancelAction() {
		console.log('cancel action');
		this.setState({
			expanded: false,
			inputValue: 'sweet',
		});
	},
	render() {
		let adderDropdown = null;
		if (this.state.expanded) {
			adderDropdown = (
				<div className='search-adder-dropdown-holder'>
					<div className='search-adder-dropdown-head'>
						<BuiActionButton minor={true} label='Markera alla' />
						<BuiActionButton minor={true} label='Avmarkera alla' />
					</div>
					<div className='search-adder-dropdown-body'>
						<BuiFormElement type='checkbox' label='Sölvesborg kommun' id='ddi1' value='ddv1' />
						<BuiFormElement type='checkbox' label='Älvdalen kommun' id='ddi2' value='ddv2' />
						<BuiFormElement type='checkbox' label='Alvesta kommun' id='ddi3' value='ddv3' />
						<BuiFormElement type='checkbox' label='Ludvika kommun' id='ddi4' value='ddv4' />
						<BuiFormElement type='checkbox' label='Rättvik kommun' id='ddi5' value='ddv5' />
						<BuiFormElement type='checkbox' label='Vansbro kommun' id='ddi6' value='ddv6' />
						<BuiFormElement type='checkbox' label='Gävle kommun' id='ddi7' value='ddv7' />
						<BuiFormElement type='checkbox' label='Hudiksvall kommun' id='ddi8' value='ddv8' />
						<BuiFormElement type='checkbox' label='Ovanåker kommun' id='ddi9' value='ddv9' />
						<BuiFormElement type='checkbox' label='Sandviken kommun' id='ddi0' value='ddv0' />
					</div>
					<div className='search-adder-dropdown-footer'>
						<BuiActionButton minor={true} label='Klar' primary={true} onClick={this._runAction} />
						<BuiActionButton minor={true} label='Avbryt' onClick={this._cancelAction} />
					</div>
				</div>
			);
		}
		const parentClass = classNames('bui-search-adder-holder', {
			'is-expanded' : this.state.expanded,
		});

		return (
			<div className={parentClass}>
				<BuiInputField icon={this.props.icon} hint={this.props.hint} onChange={this._valueAdded} value={this.state.inputValue} />
				<i className='search-adder-dropdown-indicator-icon fa fa-caret-down' />
				{adderDropdown}
			</div>
		);
	}
});

module.exports = BuiSearchAdder;
