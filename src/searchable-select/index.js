import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'underscore';

// Components
import BuiInputField from '../input-field';
import BuiCheckbox from '../checkbox';
import BuiActionButton from '../action-button';

const BuiSearchableSelect = React.createClass({
    getInitialState() {
        return {
            expanded: false,
            inputValue: null,
            checked: {},
            toggle: 'Markera alla'
        };
    },
    onFocus(event) {
        if (event.target.value !== '') {
            this.onSearch(event.target.value);
        }
    },
    onSearch(value) {
        this.setState({
            inputValue: value,
            expanded: value === '' ? false : true
        });
    },
    onToggleAll() {
        if (Object.keys(this.state.checked).length === Object.keys(this.props.data).length) {
            this.setState({checked: [], toggle: 'Markera alla'});
        } else {
            let all = _(this.props.data).map((option) => [option.id, true]);
            this.setState({checked: _.object(all), toggle: 'Avmarkera alla'});
        }
    },
    onAdd(event, isChecked) {
        let checked = this.state.checked;

        if (isChecked) {
            let data = _.find(this.props.data, {id: event.target.id});
            checked[event.target.id] = data;
        } else {
            delete checked[event.target.id];
        }

        this.setState({checked: checked, toggle: 'Markera alla'});
    },
    onSave() {
        if (typeof this.props.onSave === 'function') {
            this.props.onSave(this.state.checked);
        }

        this.setState({
            inputValue: null,
            expanded: false
        });
    },
    onCancel() {
        this.setState({
            expanded: false,
            inputValue: null,
        });
    },
    render() {
        let dropdown = null;
        let options = _(this.props.data).map((option, index) => {
            let checked = this.state.checked[option.id];
            return <BuiCheckbox key={index} label={option.label} id={option.id} value={option.value} checked={checked} onChange={this.onAdd} />
        })

        if (this.state.expanded) {
            dropdown = (
                <div className='search-adder-dropdown-holder'>
                    <div className='search-adder-dropdown-head'>
                        <BuiActionButton minor={true} label={this.state.toggle} onClick={this.onToggleAll}/>
                    </div>
                    <div className='search-adder-dropdown-body'>{options}</div>
                    <div className='search-adder-dropdown-footer'>
                        <BuiActionButton minor={true} label='Klar' primary={true} onClick={this.onSave} />
                        <BuiActionButton minor={true} label='Avbryt' onClick={this.onCancel} />
                    </div>
                </div>
            );
        }

        const classes = classNames('bui-search-adder-holder', {
            'is-expanded' : this.state.expanded,
        });

        return (
            <div className={classes}>
                <BuiInputField icon={this.props.icon} hint={this.props.hint} onChange={this.onSearch} onFocus={this.onFocus} value={this.state.inputValue} />
                <i className='search-adder-dropdown-indicator-icon fa fa-caret-down' />
                {dropdown}
            </div>
        );
    }
});

module.exports = BuiSearchableSelect;
