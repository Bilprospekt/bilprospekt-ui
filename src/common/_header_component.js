import React, { Component } from 'react';
import _                    from 'underscore';

// Components
import PopupComponent from './_popup_component';
import PaperDropdownComponent from './_paper_dropdown_component.js';
import TextEditComponent from './_text_edit_component.js';

var DatePicker = React.createClass({
    render() {
        var weekButtons = [];
        for (var i = 0; i < 52; i++) {
            weekButtons[i] = i + 1;
        };

        weekButtons = _.map(weekButtons, function(value) {
            return <div className='dropdown-button'>v. {value}</div>;
        });

        var yearButton = <span>2015<i className='fa fa-caret-down' /></span>;
        var monthButton = <span>- -<i className='fa fa-caret-down' /></span>;
        var weekButton = <span>- -<i className='fa fa-caret-down' /></span>;
        return (
            <div className='date-picker-wrapper'>
                <div className='picker-label'>{this.props.label}</div>
                <div className='picker-button'>
                    <PaperDropdownComponent dropdownButton={yearButton} dropdownStyle='datepicker'>
                        <div className='dropdown-button close-dropdown-button'>2015</div>
                        <div className='dropdown-button'>2014</div>
                        <div className='dropdown-button'>2013</div>
                        <div className='dropdown-button'>2012</div>
                        <div className='dropdown-button'>2011</div>
                        <div className='dropdown-button'>2010</div>
                    </PaperDropdownComponent>
                </div>
                <div className='picker-button'>
                    <PaperDropdownComponent dropdownButton={monthButton} dropdownStyle='datepicker'>
                        <div className='dropdown-button close-dropdown-button'>- -</div>
                        <div className='dropdown-button'>Januari</div>
                        <div className='dropdown-button'>Februari</div>
                        <div className='dropdown-button'>Mars</div>
                        <div className='dropdown-button'>April</div>
                        <div className='dropdown-button'>Maj</div>
                        <div className='dropdown-button'>Juni</div>
                        <div className='dropdown-button'>Juli</div>
                        <div className='dropdown-button'>Augusti</div>
                        <div className='dropdown-button'>september</div>
                        <div className='dropdown-button'>Oktober</div>
                        <div className='dropdown-button'>November</div>
                        <div className='dropdown-button'>December</div>
                    </PaperDropdownComponent>
                </div>
                <div className='picker-button'>
                    <PaperDropdownComponent dropdownButton={weekButton} dropdownStyle='datepicker'>
                        <div className='dropdown-button'>- -</div>
                        {weekButtons}
                    </PaperDropdownComponent>
                </div>
            </div>
        );
    }
});

var HeaderDatePickerButton = React.createClass({
    render() {
        return (
            <div className='header-datepicker-button' onClick={this.props.onClick}>
                <div className='date-icon'><i className={'fa ' + this.props.icon} /></div>
                <div className='date-info'>
                    <div className='date-left'>Från</div>
                    <div className='date-right'>
                        <p className='p-m'>{this.props.startDate[1]}</p>
                        <p className='p-m'>{this.props.startDate[0]}</p>
                        <p className='p-m'>{this.props.startDate[2]}</p>
                    </div>
                </div>
                <div className='date-icon'><i className='fa fa-chevron-right' /></div>
                <div className='date-info'>
                    <div className='date-left'>Till</div>
                    <div className='date-right'>
                        <p className='p-m'>{this.props.endDate[1]}</p>
                        <p className='p-m'>{this.props.endDate[0]}</p>
                        <p className='p-m'>{this.props.endDate[2]}</p>
                    </div>
                </div>
            </div>
        );
    }
});

var HeaderComponent = React.createClass({
	_toggleNavigation() {
		$('#navigation-wrapper').toggleClass('visible');
		$('#site-overflow-holder').toggleClass('navigation-visible');
        $(this.refs.navButton.getDOMNode()).toggleClass('closed open');
	},
    _setDate() {
        React.render (
            <PopupComponent title='Sätt datumperid' yes='Ok' no='Avbryt'>
                <DatePicker label='Från' />
                <DatePicker label='Till' />
            </PopupComponent>,
            document.getElementById('popup-holder')
        );
    },
	render() {
        var breadRow = _.map(this.props.breadcrumb, function(value) {
            return (
                <p>
                    <span>{value}</span>
                    <i className='breadcrumb-divider fa fa-angle-right' />
                </p>
            );
        });
        var datePickerButton = (this.props.datepicker) ? <HeaderDatePickerButton icon='fa-calendar' startDate={[2015, 'Augusti', 'v32']} endDate={[2015, 'September', 'v36']} onClick={this._setDate} /> : null ;
    	return (
      		<div id='header-wrapper'>
      			<div id='nav-button' className='header-button closed' ref='navButton' onClick={this._toggleNavigation}>
                <div className='open-nav'><i className='fa fa-bars' /></div>
                <div className='close-nav'><i className='fa fa-bars' /></div>
            </div>
      			<div className='header-breadcrumbs'>
                    {breadRow}
      			</div>
                <div className='header-options'>
                    {datePickerButton}
                </div>
      		</div>
    	);
  	}
});

module.exports = HeaderComponent;
