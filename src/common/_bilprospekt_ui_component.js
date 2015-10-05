import React, { Component } from 'react';

// BUI Components
import BuiActionButton        from '../bui_components/_bui_action_button_component';
import BuiInputField          from '../bui_components/_bui_input_field_component';
import BuiFormElement         from '../bui_components/_bui_form_element_component';
import BuiInlineEdit          from '../bui_components/_bui_inline_edit_component';
import BuiSearchAdder         from '../bui_components/_bui_search_adder_component';

// Bui Toolbar
import {BuiToolbarMainHolder}      from '../bui_components/_bui_toolbar_component';
import {BuiToolbarButton}          from '../bui_components/_bui_toolbar_component';
import {BuiToolbarDropdownHolder}  from '../bui_components/_bui_toolbar_component';
import {BuiToolbarDropdownElement} from '../bui_components/_bui_toolbar_component';

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
    render() {
        return (
            <div id='bilprospekt-ui-styling-holder'>
                <p className='master-header'>Bilprospekt 2.0 Style Guide</p>
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
                <p className='table-header-label'>Toolbar</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <BuiToolbarMainHolder>
                                    <BuiToolbarButton label='Skapa affär' icon='fa-plus' />
                                    <BuiToolbarButton label='Kommentera' icon='fa-comment' disabled={true} />
                                    <BuiToolbarDropdownHolder label='Filter' icon='fa-filter'>
                                        <BuiToolbarDropdownElement label='Knapp 1' />
                                        <BuiToolbarDropdownElement label='Knapp 2' />
                                        <BuiToolbarDropdownElement label='Knapp 3' disabled={true} />
                                    </BuiToolbarDropdownHolder>
                                    <BuiToolbarDropdownHolder label='Inställningar' icon='fa-gear'>
                                        <BuiToolbarDropdownElement label='Knapp 1' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 2' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 3' checkbox={true} checkboxChecked={true} />
                                        <BuiToolbarDropdownElement label='Knapp 5' checkbox={true} disabled={true} />
                                        <BuiToolbarDropdownElement label='Knapp 6' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 7' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 8' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 9' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 0' checkbox={true} />
                                    </BuiToolbarDropdownHolder>
                                    <BuiToolbarDropdownHolder label='Överblick' icon='fa-eye' disabled={true}>
                                        <BuiToolbarDropdownElement label='Knapp 1' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 2' checkbox={true} />
                                        <BuiToolbarDropdownElement label='Knapp 3' checkbox={true} />
                                    </BuiToolbarDropdownHolder>
                                </BuiToolbarMainHolder>
                            </td>
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