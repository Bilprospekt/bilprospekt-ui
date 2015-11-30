import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'underscore';

// Components
import BuiInputField from '../input-field';
import BuiFormElement from '../form-element';
import BuiActionButton from '../action-button';

const BuiSearchableSelect = React.createClass({
    getInitialState() {
        return {
            expanded: false,
            inputValue: null,
        };
    },
    onSearch(value) {
        this.setState({
            inputValue: value,
            expanded: value === '' ? false : true
        });
    },
    onAdd(event, value, id) {
        console.log('checked', event.target, value, id);
    },
    _runAction() {
        console.log('run action');
    },
    onCancelAction() {
        console.log('cancel action');
        this.setState({
            expanded: false,
            inputValue: 'sweet',
        });
    },
    render() {
        let dropdown = null;
        let checkboxes = _(this.props.data).map((d, index) => {
            return <BuiFormElement type='checkbox' key={index} label={d.label} id={d.id} value={d.value} onChange={this.onAdd} />
        })

        if (this.state.expanded) {
            dropdown = (
                <div className='search-adder-dropdown-holder'>
                    <div className='search-adder-dropdown-head'>
                        <BuiActionButton minor={true} label='Markera alla' />
                        <BuiActionButton minor={true} label='Avmarkera alla' />
                    </div>
                    <div className='search-adder-dropdown-body'>
                        {checkboxes}
                    </div>
                    <div className='search-adder-dropdown-footer'>
                        <BuiActionButton minor={true} label='Klar' primary={true} onClick={this._runAction} />
                        <BuiActionButton minor={true} label='Avbryt' onClick={this.onCancelAction} />
                    </div>
                </div>
            );
        }

        const classes = classNames('bui-search-adder-holder', {
            'is-expanded' : this.state.expanded,
        });

        return (
            <div className={classes}>
                <BuiInputField icon={this.props.icon} hint={this.props.hint} onChange={this.onSearch} value={this.state.inputValue} />
                <i className='search-adder-dropdown-indicator-icon fa fa-caret-down' />
                {dropdown}
            </div>
        );
    }
});

module.exports = BuiSearchableSelect;
