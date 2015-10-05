import React, { Component } from 'react';

var PaperDropdownContent = React.createClass({
    render() {
        if (this.props.children.length > 6 || this.props.children[1].length > 6) {
            var contentClass = 'dropdown-content long-list';
        } else {
            var contentClass = 'dropdown-content';
        }

        if (this.props.dropdownStyle === 'paper') {
            var dropdownStyle = ({
                right : -10,
                top   : -10
            });
        } else if (this.props.dropdownStyle === 'listview') {
            var dropdownStyle = ({
                right : 0,
                top  : 0
            });
        } else if (this.props.dropdownStyle === 'datepicker') {
            var dropdownStyle = ({
                left : -20,
                top  : -10
            });
        } else if (this.props.dropdownStyle === 'goalpicker') {
            var dropdownStyle = ({
                left : -20,
                top  : -17
            });
        } else if (this.props.dropdownStyle === 'garageselector') {
            var dropdownStyle = ({
                left : 0,
                top  : 0
            });
        }

        return (
            <div className={contentClass} style={dropdownStyle}>
                {this.props.children}
            </div>
        );
    }
});

var PaperDropdownComponent = React.createClass({
    componentDidMount() {
        var that = this;
        $('body').click(function(event) {
            if ( event.target.id === 'column-picker' ) {
            } else if ( $(event.target).hasClass('checkbox-button') || $(event.target).parent().hasClass('checkbox-button') ) {
                // Do nothing
            } else {
                that._closeDropdown();
            }
        });
    },
    _closeDropdown() {
        $(this.refs.dropdownParent.getDOMNode()).removeClass('open');
    },
    _showDropdown() {
        $(this.refs.dropdownParent.getDOMNode()).addClass('open');
    },
    render() {
        return (
            <div className='paper-dropdown-holder' ref='dropdownParent'>
                <div className='dropdown-icon' onClick={this._showDropdown}>{this.props.dropdownButton}</div>
                <PaperDropdownContent dropdownStyle={this.props.dropdownStyle}>
                    {this.props.children}
                </PaperDropdownContent>
            </div>
        );
    }
});

module.exports = PaperDropdownComponent;