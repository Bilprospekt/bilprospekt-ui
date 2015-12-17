import React, { Component } from 'react';
import classNames           from 'classnames';
import _ from 'underscore';
import Infinite from 'react-infinite';

// Components
import Checkbox from '../checkbox'

const DropdownElement = React.createClass({
    propTypes: {
        label:    React.PropTypes.string.isRequired,

        //If we want to use a checkbox.
        checkbox: React.PropTypes.bool,

        //If checkbox is checked.
        checkboxChecked: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        onClick: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            checkbox: false,
            checkboxChecked: false,
        };
    },
    render() {
        const props = {
            type: 'checkbox',
            label: this.props.label,
            checked: !!this.props.checkboxChecked,
            disabled: this.props.disabled,
            onChange: this.props.onClick,
        };

        const dropdownElement = (this.props.checkbox)
          ? <Checkbox {...props} />
          : <p onClick={this.props.onClick} className='dropdown-label'>{this.props.label}</p> ;

        const elementClass = classNames('dropdown-element', {
            'is-disabled': this.props.disabled,
        });

        return (
            <div className={elementClass}>
                {dropdownElement}
            </div>
        );
    }
});

const DropdownHolder = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
        icon:  React.PropTypes.string,
        disabled: React.PropTypes.bool,
        style: React.PropTypes.object,
        noArrow: React.PropTypes.bool,
        orientation: React.PropTypes.string,
        onToggle: React.PropTypes.func,
        useInfiniteScroll: React.PropTypes.bool,
        autoSize: React.PropTypes.bool,
    },
    getInitialState() {
        return {
            opened: false,
            page: 1,
        };
    },
    getDefaultProps() {
        return {
            noArrow: false,
            orientation: "left",
            useInfiniteScroll: false,
            autoSize: false,
        };
    },
    componentDidUpdate() {
        if (this.state.opened) {
            document.addEventListener('click', this._hideDrop);
        }
    },
    _triggerToggle(val) {
        if (typeof this.props.onToggle === 'function') {
            this.props.onToggle(val);
        }
    },
    _handleClick() {
        if (!this.props.disabled) {
            this._triggerToggle(true);
            if (this.isMounted()) {
                this.setState({ opened: true });
            }
        }
    },
    _hideDrop(e) {
        var $el = $(e.target);
        var dontCloseMePleaseClass = '.bui-form-element, .DayPicker';
        if ($el.is(dontCloseMePleaseClass) || $el.parents().is(dontCloseMePleaseClass) || $el.children().is(dontCloseMePleaseClass)) {
            return;
        }

        if (this.state.opened) {
            this._triggerToggle(false);
            if (this.isMounted()) {
                this.setState({ opened: false });
            }
            document.removeEventListener('click', this._hideDrop);
        }
    },
    componentWillUnmount() {
        document.removeEventListener('click', this._hideDrop);
    },
    _handleInfiniteLoading() {
        this.setState({
            page: this.state.page + 1,
        });
    },
    render() {
        const parentClass = classNames('toolbar-dropdown-holder', {
            'is-open':     this.state.opened,
            'is-disabled': this.props.disabled,
        });

        const labelIcon = <i className={'toolbar-icon fa ' + this.props.icon} />;
        const caret = (!this.props.noArrow) ? <i className='toolbar-caret fa fa-caret-down' /> : null;
        let elementsHolderStyle = {};

        if (this.props.orientation === 'right') {
            elementsHolderStyle.left = 'initial';
            elementsHolderStyle.right = 0;
        }

        let children = this.props.children;
        if (this.props.useInfiniteScroll) {
            const childHeight = 40;
            const childElLen = 20;
            const childEls = React.Children.toArray(this.props.children).slice(0, this.state.page * childElLen);
            elementsHolderStyle.overflow = 'hidden';
            children = (
                <Infinite elementHeight={childHeight}
                          containerHeight={220}
                          infiniteLoadBeginEdgeOffset={200}
                          onInfiniteLoad={this._handleInfiniteLoading}
                    >
                    {childEls}
                </Infinite>

            )
        }

        const holderClass = classNames('toolbar-dropdown-elements-holder', {
            'auto-size-is-enabled': this.props.autoSize,
        });

        return (
            <div style={this.props.style} className={parentClass} onClick={this._handleClick}>
                <div className='toolbar-dropdown-holder-label'>
                    {labelIcon}
                    <span className='toolbar-text-label'>{this.props.label}</span>
                {caret}
                </div>
                <div style={elementsHolderStyle} className={holderClass}>
                    {children}
                </div>
            </div>
        );
    }
});

exports.DropdownElement = DropdownElement;
exports.DropdownHolder = DropdownHolder;
