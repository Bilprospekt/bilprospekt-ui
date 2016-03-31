import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import _ from 'underscore';
import $ from 'jquery';
import EventUtil from '../helpers/EventUtil.js';

// Components
import BuiInputField from '../input-field';
import BuiCheckbox from '../checkbox';
import BuiActionButton from '../action-button';

const BuiSearchableSelect = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        icon: React.PropTypes.string,
        hint: React.PropTypes.string,
        onSaveLabel: React.PropTypes.string,
        onSave: React.PropTypes.func,
        onChange: React.PropTypes.func,
        fieldWidth: React.PropTypes.number,
    },
    getInitialState() {
        return {
            expanded: false,
            inputValue: null,
            checked: [],
            toggle: 'Markera alla'
        };
    },
    getDefaultProps() {
        return {
            onSaveLabel: 'Välj',
        };
    },
    componentDidMount() {
        EventUtil.addHandler(window, 'click', this._onClick);
    },
    componentWillUnmount() {
        EventUtil.removeHandler(window, 'click', this._onClick);
    },
    _onClick(ev) {
        const $target = $(ev.target);
        const node = ReactDOM.findDOMNode(this);
        if (!($target.is(node) || $target.parents().is(node))) {
            this.setState({
                expanded: false,
            });
        }
    },
    clear() {
        this.setState({
            inputValue: null,
        });
    },
    onFocus(event) {
        if (event.target.value !== '') {
            this.onSearch(event.target.value);
        }
    },
    onSearch(value) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }

        this.setState({
            inputValue: value,
            expanded: (value === '') ? false : true
        });
    },
    onToggleAll() {
        if (this.state.checked.length === this.props.data.length) {
            this.setState({checked: [], toggle: 'Markera alla'});
        } else {
            let all = _(this.props.data).pluck('id');
            this.setState({checked: all, toggle: 'Avmarkera alla'});
        }
    },
    onAdd(id, event, isChecked) {
        let checked = this.state.checked;

        //Allow 0 as id
        const validId = (id || id === 0);
        if (isChecked && validId) {
            checked.push(id);
        } else if(validId && checked.indexOf(id) !== -1) {
            checked.splice(checked.indexOf(id), 1);
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
        const options = _(this.props.data).map((option, index) => {
            const id = option.id;
            const checked = this.state.checked.indexOf(id) !== -1;
            return <BuiCheckbox key={index} label={option.label} id={'' + id} checked={checked} onChange={this.onAdd.bind(this, id)} />
        })

        const buttonProps = {
            style: {
                margin: 5,
                padding: 10,
            },
            flat: true,
        };

        if (this.state.expanded) {
            dropdown = (
                <div className='search-adder-dropdown-holder'>
                    <div className='search-adder-dropdown-head'>
                        <BuiActionButton {...buttonProps} secondary label={this.state.toggle} onClick={this.onToggleAll}/>
                    </div>
                    <div className='search-adder-dropdown-body'>{options}</div>
                    <div className='search-adder-dropdown-footer'>
                        <BuiActionButton {...buttonProps} primary label='Avbryt' onClick={this.onCancel} />
                        <BuiActionButton {...buttonProps} primary label={this.props.onSaveLabel} onClick={this.onSave} /> 
                    </div>
                </div>
            );
        }

        const classes = classNames('bui-search-adder-holder', {
            'is-expanded' : this.state.expanded,
        });

        // this.props.fieldWidth & this.props.style
        let holderStyle = null;
        if (this.props.style) {
            holderStyle = this.props.style;
            holderStyle.width = (this.props.fieldWidth) ? this.props.fieldWidth : null ;
        } else if (this.props.fieldWidth) {
            holderStyle = ({
                width: this.props.fieldWidth,
            });
        }

        return (
            <div className={classes} style={holderStyle}>
                <BuiInputField icon={this.props.icon} hint={this.props.hint} onChange={this.onSearch} onFocus={this.onFocus} value={this.state.inputValue} />
                <i className='search-adder-dropdown-indicator-icon fa fa-caret-down' />
                {dropdown}
            </div>
        );
    }
});

module.exports = BuiSearchableSelect;
