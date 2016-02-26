import React, { Component } from 'react';
import $                    from 'jquery';

//Docs components
import BilprospektTooltipDoc from './_bilprospekt_tooltip_component.js';
import BilprospektToolbarDoc from './_bilprospekt_toolbar_component.js';
import BilprospektTableDoc from './_bilprospekt_table_component.js';
import BilprospektDropdownDoc from './_bilprospekt_dropdown_component.js';
import BilprospektDatePickerDoc from './_bilprospekt_datepicker_component.js';
import BilprospektRadioDoc from './_bilprospekt_radio_component.js';
import BilprospektSelectDoc from './_bilprospekt_select_component.js';
import BilprospektChipsDoc from './_bilprospekt_chips_component.js';
import BilprospektLoaderDoc from './_bilprospekt_loader_component.js';
import BilprospektTabsDoc from './_bilprospekt_tabs_component.js';
import BilprospektPopupDoc from './_bilprospekt_popup_component.js';
import BilprospektActionButtonDoc from './_bilprospekt_action_button_component.js';
import BilprospektSearchableSelectDoc from './_bilprospekt_searchable_select_component.js';
import BilprospektInlineEditDoc from './_bilprospekt_inline_edit_component.js';
import BilprospektInputFieldDoc from './_bilprospekt_input_field_component.js';
import BilprospektFormElementsDoc from './_bilprospekt_form_elements_component.js';
import BilprospektAppDoc from './_bilprospekt_app_component.js';

const NavElement = React.createClass({
    _onClick(e) {
        // Variables
        const $el = $(e.target);
        const $target = $( '#' + this.props.target + 'Doc' );

        // Set classes
        $el.siblings().removeClass('active-nav-element');
        $el.addClass('active-nav-element');

        // Scroll animation
        $('html, body').animate({
            scrollTop: $target.offset().top
        }, 175);
    },
    render() {
        return (
            <li className={this.props.className} onClick={this._onClick}>{this.props.label}</li>
        );
    }
});

var BilprospektUiComponent = React.createClass({
    render() {
        return (
            <div className='bui-docs-wrapper'>
                <div className='docs-navigation'>
                    <div className='nav-logotype' />
                    <div className='nav-menu'>
                        <ul>
                            <NavElement label='App Example' target='App' className='active-nav-element' />
                            <NavElement label='Tabs' target='Tabs' />
                            <NavElement label='Date Picker' target='DatePicker' />
                            <NavElement label='Table' target='Table' />
                            <NavElement label='Tooltip' target='Tooltip' />
                            <NavElement label='Toolbar' target='Toolbar' />
                            <NavElement label='Dropdown' target='Dropdown' />
                            <NavElement label='Radio' target='Radio' />
                            <NavElement label='Select' target='Select' />
                            <NavElement label='Chips' target='Chips' />
                            <NavElement label='Loader' target='Loader' />
                            <NavElement label='Popup' target='Popup' />
                            <NavElement label='Action Button' target='ActionButton' />
                            <NavElement label='Searchable Select' target='SearchableSelect' />
                            <NavElement label='Inline Edit' target='InlineEdit' />
                            <NavElement label='Input Field' target='InputField' />
                            <NavElement label='Form Elements' target='FormElements' />
                        </ul>
                    </div>
                </div>
                <div className='docs-content'>
                    <BilprospektAppDoc />             
                    <BilprospektTabsDoc />
                    <BilprospektDatePickerDoc />
                    <BilprospektTableDoc />
                    <BilprospektTooltipDoc />
                    <BilprospektToolbarDoc />
                    <BilprospektDropdownDoc />
                    <BilprospektRadioDoc />
                    <BilprospektSelectDoc />
                    <BilprospektChipsDoc />
                    <BilprospektLoaderDoc />
                    <BilprospektPopupDoc />
                    <BilprospektActionButtonDoc />
                    <BilprospektSearchableSelectDoc />
                    <BilprospektInlineEditDoc />
                    <BilprospektInputFieldDoc />
                    <BilprospektFormElementsDoc />
                </div>
            </div>
        );
    }
});

module.exports = BilprospektUiComponent;
