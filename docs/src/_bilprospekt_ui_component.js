import React, { Component } from 'react';

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

var BilprospektUiComponent = React.createClass({
    render() {
        return (
            <div className='bui-docs-wrapper'>
                <p className='master-header'>Bilprospekt 2.0 Style Guide</p>
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
        );
    }
});

module.exports = BilprospektUiComponent;
