import React, { Component } from 'react';
import _                    from 'underscore';

// Components
import PaperDropdownComponent from './_paper_dropdown_component.js';

var PaperComponent = React.createClass({
    getDefaultProps() {
        return {
            gridSize: 12,
            title: 'Untitled'
        };
    },
    componentDidMount() {
        $(this.refs.holder.getDOMNode()).find('.data-desc').on('click', function() {
            window.location.replace('/list');
        });
        $(this.refs.holder.getDOMNode()).find('.objective-bot-row').on('click', function() {
            window.location.replace('/list');
        });
    },
    componentWillUnmount() {
        $(this.refs.holder.getDOMNode()).find('.data-desc').off('click');
        $(this.refs.holder.getDOMNode()).find('.objective-bot-row').off('click');
    },
	render() {
        // prop.clickable
        var clickableDiv;
        if (this.props.clickable === 'menu') {
            var button = <i className='fa fa-gears' />;
            clickableDiv = (
                <div className='paper-header-clickable'>
                    <PaperDropdownComponent dropdownButton={button} dropdownStyle='paper'>
                        <div className='dropdown-button'>Knapp 1</div>
                        <div className='dropdown-button'>Knapp 2</div>
                        <div className='dropdown-button disabled-button'>Knapp 3</div>
                        <div className='dropdown-button close-dropdown-button'>Knapp 4</div>
                    </PaperDropdownComponent>
                </div>
            );
        } else if (this.props.clickable === 'link') {
            clickableDiv = (
                <div className='paper-header-clickable'>
                    <div className='fastlink-icon'><i className='fa fa-chevron-right' /></div>
                </div>
            );
        } else {
            clickableDiv = <div className='paper-header-clickable'><p>{this.props.clickable}</p></div>;
        }

        // prop.toggleMenu
        var toggleMenuDiv;
        if (this.props.toggleMenu) {
            _.map(this.props.toggleMenu), function(value) {
                return <div>{value}</div>;
            }
            var toggleMenuDiv = <div className='paper-header-toggle-menu'>{this.props.toggleMenu}</div>;
        }

    	return (
      		<div className={'paper grid-' + this.props.gridSize} ref='holder' style={this.props.style}>
                <div className='paper-header'>
                    <div className='paper-header-title'>{this.props.title}</div>
                    <div className='paper-header-description'>{this.props.description}</div>
                    {clickableDiv}
                    {toggleMenuDiv}
                </div>
                <div className='paper-content'>
                    {this.props.children}
                </div>
      		</div>
    	);
  	}
});

module.exports = PaperComponent;
