import React, { Component } from 'react';
import classNames from 'classnames';
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
            const $el = $(this.refs.editInputField);
            $el.find('input').focus();
        }
    },
    onEdit() {
        this.setState({ editing: true });
    },
    onChange(value) {
        this.setState({ string: value });
    },
    onDelete() {
        this.onChange('');
    },
    onSave() {
        if (typeof this.props.onSave === 'function') {
            this.props.onSave(this.state.string)
        }

        this.setState({ editing: false });
    },
    onCancel() {
        this.setState({ editing: false });
    },
    getString() {
        let string = this.props.string
        if (this.state.string !== undefined) {
            string = this.state.string;
        }

        // Show placeholder if string is empty
        if (!string && this.props.placeholder && !this.state.editing) {
            string = <i>{this.props.placeholder}</i>;
        }

        return string;
    },
    render() {
        const parentClass = classNames('bui-inline-edit-component', {
            'is-editing' : this.state.editing,
        });

        let string = this.getString();

        let buttons = null;
        if (this.state.editing) {
            string = <BuiInputField ref='editInputField' value={string} onChange={this.onChange} icon='fa-pencil' />;
            buttons = (
                <div className='inline-edit-buttons-holder'>
                    <i className='inline-edit-button fa fa-check' onClick={this.onSave} />
                    <i className='inline-edit-button fa fa-times' onClick={this.onCancel} />
                </div>
            );

        } else {
            string = <p className='p-information'>{string}</p>;
            buttons = (
                <div className='inline-edit-buttons-holder'>
                    <i className='inline-edit-button fa fa-pencil' onClick={this.onEdit} />
                    <i className='inline-edit-button fa fa-trash' onClick={this.onDelete} />
                </div>
            );
        }

        return (
            <div className={parentClass}>
                {string}
                <p className='inline-edit-hover-icon'><i className='inline-edit-button fa fa-pencil' /></p>
                {buttons}
            </div>
        );
    }
});

module.exports = BuiInlineEdit;
