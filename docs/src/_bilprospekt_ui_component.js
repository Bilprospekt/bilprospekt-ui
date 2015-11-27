import React, { Component } from 'react';

import * as BUI from 'bilprospekt-ui';
const {
  IconMenu: IconMenu,
  ActionButton: BuiActionButton,
  FormElement: BuiFormElement,
  InlineEdit: BuiInlineEdit,
  InputField: BuiInputField,
  SearchAdder: BuiSearchAdder,
  Popup: BuiPopup
} = BUI;

//Docs components
import BilprospektTooltipDoc from './_bilprospekt_tooltip_component.js';
import BilprospektToolbarDoc from './_bilprospekt_toolbar_component.js';

var CodeSegment = React.createClass({
    render() {
        var classRender;
        if (this.props.class === false) {
            classRender = '';
        } else {
            classRender = (
                <span>
                    <span className='class-class'> className</span>
                    <span className='tag-class'>=</span>
                    <span className='classname-class'>&#39;{this.props.class}&#39;</span>
                </span>
            );
        }
        return (
            <p className='code-segment'>
                <span className='tag-class'>&#60;</span>
                <span className='type-class'>{this.props.tag}</span>
                {classRender}
                <span className='tag-class'>&#62;</span>
                <span className='content-class'>{this.props.content}</span>
                <span className='tag-class'>&#60;</span>
                <span className='type-class'>/{this.props.tag}</span>
                <span className='tag-class'>&#62;</span>
            </p>
        );
    }
});

var ComponentSegment = React.createClass({
    render() {
        var propString = [];
        for (var i = 0; i < this.props.prop.length; i++) {
            propString.push (
                <span>
                    <span className='classname-class'>{this.props.prop[i]}</span>
                    <span className='class-class'>={this.props.propType[i]} </span>
                </span>
            );
        };
        return (
            <p className='code-segment'>
                <span className='tag-class'>&#60;</span>
                <span className='type-class'>{this.props.name} </span>
                {propString}
                <span className='type-class'> /</span>
                <span className='tag-class'>&#62;</span>
            </p>
        );
    }
});

var BilprospektUiComponent = React.createClass({
    getInitialState() {
        return {
            popup: false
        };
    },
    openPopup() {
        this.setState({popup: true});
    },
    hidePopup() {
        this.setState({popup: false});
    },
    getPopupProps() {
        let headerButton = <a href="#">Some Action</a>;
        let saveButton = <div className='popup-footer-button' onClick={this.hidePopup}>Save</div>;
        let closeButton = <div className='popup-footer-button' onClick={this.hidePopup}>Close</div>;
        return {
            onClose: this.hidePopup,
            header: {
                title: 'Popup',
                controls: {
                    headerButton
                }
            },
            footer: {
                controls: {
                    saveButton,
                    closeButton
                }
            }
        };
    },
    render() {
        let popup = null;
        if (this.state.popup) {
            popup = (
                <BuiPopup {...this.getPopupProps()}>
                    This is a popup. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia interdum lorem, et iaculis tortor blandit eu. In vestibulum massa porttitor, efficitur ipsum quis, luctus purus. Phasellus felis nunc, molestie sit amet condimentum ut, bibendum congue odio. Donec dapibus enim id bibendum fermentum. Aenean interdum sem ornare dapibus porta. Nullam ut arcu at sem pharetra aliquet. Pellentesque convallis, purus a molestie molestie, nisi ipsum dapibus augue, auctor ultrices ipsum odio non nunc. Quisque vel eleifend massa, quis viverra tortor. Aenean fermentum metus aliquam rhoncus accumsan. Nullam sodales ullamcorper maximus. Vivamus venenatis, est a gravida fringilla, metus felis varius dui, vel cursus lectus massa eu diam. Praesent commodo finibus luctus. Nunc convallis mauris at facilisis tincidunt. Sed pulvinar elit metus, at interdum ligula feugiat vitae. Donec at finibus elit, placerat accumsan neque.
                </BuiPopup>
            );
        }

        return (
            <div id='bilprospekt-ui-styling-holder'>
                <p className='master-header'>Bilprospekt 2.0 Style Guide</p>
                <BilprospektTooltipDoc />
                <BilprospektToolbarDoc />
                <p className='table-header-label'>Popup</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><BuiActionButton primary={false} minor={true} label='Open popup' onClick={this.openPopup}/>{popup}</td>
                            <td><p className='code-type type-component'>Component</p></td>
                        </tr>
                    </tbody>
                </table>
                <p className='table-header-label'>Action Buttons</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>How to use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><BuiActionButton primary={true} label='Primary Action Button'/></td>
                            <td>Primary button for events and actions.</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiActionButton' prop={['primary', 'label']} propType={['true', 'string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiActionButton label='Secondary Action Button'/></td>
                            <td>Secondary button.</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiActionButton' prop={['primary', 'label']} propType={['false', 'string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiActionButton primary={true} minor={true} label='Primary Minor'/></td>
                            <td>A small primary button for events and actions.</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiActionButton' prop={['primary', 'label', 'minor']} propType={['true', 'string', 'bool']} /></td>
                        </tr>
                        <tr>
                            <td><BuiActionButton  minor={true} label='Secondary Minor'/></td>
                            <td>A small secondary button.</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiActionButton' prop={['label', 'minor']} propType={['string', 'bool']} /></td>
                        </tr>
                    </tbody>
                </table>
                <p className='table-header-label'>Search Adder</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><BuiSearchAdder icon='fa-search' hint='Sök efter län/kommun' /></td>
                            <td><p className='code-type type-component'>Component</p></td>
                        </tr>
                    </tbody>
                </table>
                <p className='table-header-label'>Inline Edit</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><BuiInlineEdit string='Editable string' /></td>
                            <td><p className='code-type type-component'>Component</p></td>
                        </tr>
                    </tbody>
                </table>
                <p className='table-header-label'>Input Field</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>How to use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><BuiInputField hint='Hint text' /></td>
                            <td>Normal with hint text</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiInputField' prop={['hint']} propType={['string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiInputField hint='Search for prospect' icon='fa-search' /></td>
                            <td>Normal with hint text and icon</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiInputField' prop={['hint', 'icon']} propType={['string', 'string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiInputField hint='Firstname' value='Dan' /></td>
                            <td>Normal with text</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiInputField' prop={['hint', 'value']} propType={['string', 'string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiInputField hint='Search for prospect' value='JKAB' icon='fa-search' /></td>
                            <td>Normal with text and icon</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiInputField' prop={['hint', 'icon']} propType={['string', 'string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiInputField hint='Enter your e-mail' value='dan.bilprospekt.se' error='Bad e-mail adress' /></td>
                            <td>Error, bad input</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiInputField' prop={['hint', 'error']} propType={['string', 'string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiInputField value='Disabled' disabled={true} /></td>
                            <td>Disabled with value</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiInputField' prop={['value', 'disabled']} propType={['string', 'true']} /></td>
                        </tr>
                        <tr>
                            <td><BuiInputField value='Password$12345' password={true} /></td>
                            <td>Masked input for passwords</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiInputField' prop={['value', 'password']} propType={['string', 'true']} /></td>
                        </tr>
                    </tbody>
                </table>
                <p className='table-header-label'>Form Elements</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>How to use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><BuiFormElement type='checkbox' id='cb1' value='cb1' label='Option 1' /></td>
                            <td>Normal Checkbox</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiFormElement' prop={['type', 'label', 'id', 'value']} propType={['"checkbox"','string', '"cb1"', '"cb1"']} /></td>
                        </tr>
                        <tr>
                            <td><BuiFormElement type='checkbox' id='cb2' value='cb2' label='Option 2' checked={true}/></td>
                            <td>Checked Checkbox</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiFormElement' prop={['type', 'label', 'checked']} propType={['"checkbox"','string','{true}']} /></td>
                        </tr>
                        <tr>
                            <td><BuiFormElement type='checkbox' id='cb3' value='cb3' label='Option 3' disabled={true} /></td>
                            <td>Disabled Checkbox</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiFormElement' prop={['type', 'label', 'disabled']} propType={['"checkbox"','string','{true}']} /></td>
                        </tr>
                        <tr>
                            <td><BuiFormElement type='radio' id='rb1' value='rb1' label='Option 1' /></td>
                            <td>Normal Radio Button</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiFormElement' prop={['type', 'label']} propType={['"radio"','string']} /></td>
                        </tr>
                        <tr>
                            <td><BuiFormElement type='radio' id='rb2' value='rb2' label='Option 2' checked={true} /></td>
                            <td>Checked Radio Button</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiFormElement' prop={['type', 'label', 'checked']} propType={['"radio"','string', '{true}']} /></td>
                        </tr>
                        <tr>
                            <td><BuiFormElement type='radio' id='rb3' value='rb3' label='Option 3' disabled={true} /></td>
                            <td>Disabled Radio Button</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiFormElement' prop={['type', 'label', 'disabled']} propType={['"radio"','string', '{true}']} /></td>
                        </tr>
                        <tr>
                            <td><BuiFormElement type='toggle' id='t1' value='t1' label='Feel Good' /></td>
                            <td>Toggle Button</td>
                            <td><p className='code-type type-component'>Component</p></td>
                            <td><ComponentSegment name='BuiFormElement' prop={['type', 'label',]} propType={['"toggle"','string']} /></td>
                        </tr>
                    </tbody>
                </table>
                <p className='table-header-label'>Typography</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>How to use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><h1>Header 1</h1></td>
                            <td>24 px</td>
                            <td><p className='code-type type-class'>Class</p></td>
                            <td><CodeSegment tag='h1' class={false} content='Header 1' /></td>
                        </tr>
                        <tr>
                            <td><h2>Header 2</h2></td>
                            <td>18 px</td>
                            <td><p className='code-type type-class'>Class</p></td>
                            <td><CodeSegment tag='h2' class={false} content='Header 2' /></td>
                        </tr>
                        <tr>
                            <td><h3>Header 3</h3></td>
                            <td>14 px</td>
                            <td><p className='code-type type-class'>Class</p></td>
                            <td><CodeSegment tag='h3' class={false} content='Header 3' /></td>
                        </tr>
                        <tr>
                            <td><p className='p-information'>Information</p></td>
                            <td></td>
                            <td><p className='code-type type-class'>Class</p></td>
                            <td><CodeSegment tag='p' class='p-information' content='Information' /></td>
                        </tr>
                        <tr>
                            <td><p className='p-body'>Body</p></td>
                            <td></td>
                            <td><p className='code-type type-class'>Class</p></td>
                            <td><CodeSegment tag='p' class='p-body' content='Body' /></td>
                        </tr>
                        <tr>
                            <td><p className='p-table-head'>Table Head</p></td>
                            <td></td>
                            <td><p className='code-type type-class'>Class</p></td>
                            <td><CodeSegment tag='p' class='p-table-head' content='Table Head' /></td>
                        </tr>
                        <tr>
                            <td><p className='p-description'>Description</p></td>
                            <td></td>
                            <td><p className='code-type type-class'>Class</p></td>
                            <td><CodeSegment tag='p' class='p-description' content='Description' /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = BilprospektUiComponent;
