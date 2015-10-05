import React, { Component } from 'react';
import _                    from 'underscore';

// Components
import PopupComponent from './_popup_component';
import PaperDropdownComponent from './_paper_dropdown_component.js';
import TextEditComponent from './_text_edit_component.js';

var ContentButton = React.createClass({
    render() {
        return (
            <div className='content-button' onClick={this.props.onClick}>
                <div className='icon'><i className={'fa ' + this.props.icon} /></div>
                <div className='label'>{this.props.label}</div>
            </div>
        );
    }
});

var DatePicker = React.createClass({
    render() {
        var weekButtons = [];
        for (var i = 0; i < 52; i++) {
            weekButtons[i] = i + 1;
        };

        weekButtons = _.map(weekButtons, function(value) {
            return <div className='dropdown-button'>v. {value}</div>;
        });

        var yearButton = <span>2015<i className='fa fa-caret-down' /></span>;
        var monthButton = <span>- -<i className='fa fa-caret-down' /></span>;
        var weekButton = <span>- -<i className='fa fa-caret-down' /></span>;
        return (
            <div className='date-picker-wrapper'>
                <div className='picker-label'>{this.props.label}</div>
                <div className='picker-button'>
                    <PaperDropdownComponent dropdownButton={yearButton} dropdownStyle='datepicker'>
                        <div className='dropdown-button close-dropdown-button'>2015</div>
                        <div className='dropdown-button'>2014</div>
                        <div className='dropdown-button'>2013</div>
                        <div className='dropdown-button'>2012</div>
                        <div className='dropdown-button'>2011</div>
                        <div className='dropdown-button'>2010</div>
                    </PaperDropdownComponent>
                </div>
                <div className='picker-button'>
                    <PaperDropdownComponent dropdownButton={monthButton} dropdownStyle='datepicker'>
                        <div className='dropdown-button close-dropdown-button'>- -</div>
                        <div className='dropdown-button'>Januari</div>
                        <div className='dropdown-button'>Februari</div>
                        <div className='dropdown-button'>Mars</div>
                        <div className='dropdown-button'>April</div>
                        <div className='dropdown-button'>Maj</div>
                        <div className='dropdown-button'>Juni</div>
                        <div className='dropdown-button'>Juli</div>
                        <div className='dropdown-button'>Augusti</div>
                        <div className='dropdown-button'>september</div>
                        <div className='dropdown-button'>Oktober</div>
                        <div className='dropdown-button'>November</div>
                        <div className='dropdown-button'>December</div>
                    </PaperDropdownComponent>
                </div>
                <div className='picker-button'>
                    <PaperDropdownComponent dropdownButton={weekButton} dropdownStyle='datepicker'>
                        <div className='dropdown-button'>- -</div>
                        {weekButtons}
                    </PaperDropdownComponent>
                </div>
            </div>
        );
    }
});

var CurrentGoal = React.createClass({
    render() {
        var goalButton = (
            <p>
                <span>{this.props.goal}</span>
                <i className='fa fa-caret-down' />
            </p>
        );
        return (
            <div className='current-goal-holder'>
                <div className='goal-top-part'>
                    <div className='number'><TextEditComponent label={this.props.number} height={30} /></div>
                    <p className='desc'>{this.props.desc}</p>
                </div>
                <div className='goal-bot-part'>
                    <PaperDropdownComponent dropdownButton={goalButton} dropdownStyle='goalpicker'>
                        <div className='dropdown-button close-dropdown-button'>Intäkt per närvaro h</div>
                        <div className='dropdown-button'>Debiterad tid</div>
                        <div className='dropdown-button'>Frånvaro</div>
                    </PaperDropdownComponent>
                </div>
            </div>
        );
    }
});

var UserEditing = React.createClass({
    render() {
        var topPart = (
            <div className='number'><TextEditComponent label={this.props.text} height={30} /></div>
        );
        if (this.props.dropPick) {
            var ddButton = (
                <p className='number' style={{'cursor':'pointer'}}>
                    {this.props.text}<span style={{'marginLeft':'5px'}}><i className='fa fa-caret-down' /></span>
                </p>
            );
            topPart = (
                <PaperDropdownComponent dropdownButton={ddButton} dropdownStyle='garageselector'>
                    <div className='dropdown-button close-dropdown-button' style={{'minWidth':'195px'}}>Kungsbacka</div>
                    <div className='dropdown-button' ref='lvl2'>Göteborg/Mölndal</div>
                    <div className='dropdown-button'>Västergötland/Bohuslän</div>
                    <div className='dropdown-button'>Småland</div>
                    <div className='dropdown-button'>Stockholm</div>
                    <div className='dropdown-button'>Skåne</div>
                    <div className='dropdown-button'>Södra Skåne</div>
                    <div className='dropdown-button'>Transport & Last</div>
                    <div className='dropdown-button'>Multibrand</div>
                    <div className='dropdown-button'>Uppland</div>
                </PaperDropdownComponent>
            );
        }
        return (
            <div className='current-goal-holder'>
                <div className='goal-top-part' style={{'position':'relative'}}>
                    {topPart}
                </div>
                <div className='goal-bot-part'>
                    <p>{this.props.infoType}</p>
                </div>
            </div>
        );
    }
});

var ListToggleFilter = React.createClass({
    componentDidMount() {
        $('.list-toggle-filter-holder p').click(function() {
            $(this).siblings().removeClass('selected-filter');
            $(this).addClass('selected-filter');
        });
    },
    render() {
        return (
            <div className='list-toggle-filter-holder'>
                <p className='selected-filter'>Alla</p>
                <p>Regioner</p>
                <p>Anläggningar</p>
                <p>Anställda</p>
            </div>
        );
    }
});

var ContentHeaderComponent = React.createClass({
    componentDidMount() {
        if (this.refs.lvl2) {
            $(this.refs.lvl2.getDOMNode()).on('click', function() {
                window.location.replace('/garage2');
            });
        }
        if (this.refs.lvl3) {
            $(this.refs.lvl3.getDOMNode()).on('click', function() {
                window.location.replace('/garage3');
            });
        }
    },
    componentWillUnmount() {
        if (this.refs.lvl2) {
            $(this.refs.lvl2.getDOMNode()).off('click');
        }
        if (this.refs.lvl3) {
            $(this.refs.lvl3.getDOMNode()).off('click');
        }
    },
    render() {
        var leftPartRender;
        var middlePartRender;
        var rightPartRender;
        if (this.props.view === 'garage') {
            var ddButton = ( 
                <div className='big' style={{'cursor':'pointer'}}>Alla <i className='fa fa-caret-down' /></div> 
            );
            leftPartRender = (
                <div className='text' style={{'position':'relative'}}>
                    <PaperDropdownComponent dropdownButton={ddButton} dropdownStyle='garageselector'>
                        <div className='dropdown-button close-dropdown-button' style={{'minWidth':'195px'}}>Alla</div>
                        <div className='dropdown-button' ref='lvl2'>Göteborg/Mölndal</div>
                        <div className='dropdown-button'>Västergötland/Bohuslän</div>
                        <div className='dropdown-button'>Småland</div>
                        <div className='dropdown-button'>Stockholm</div>
                        <div className='dropdown-button'>Skåne</div>
                        <div className='dropdown-button'>Södra Skåne</div>
                        <div className='dropdown-button'>Transport & Last</div>
                        <div className='dropdown-button'>Multibrand</div>
                        <div className='dropdown-button'>Uppland</div>
                    </PaperDropdownComponent>
                    <p className='small'>9 st regioner</p>
                </div>
            );
        } else if (this.props.view === 'garage2') {
            var ddButton = ( 
                <div className='big' style={{'cursor':'pointer'}}>Göteborg/Mölndal <i className='fa fa-caret-down' /></div> 
            );
            leftPartRender = (
                <div className='text' style={{'position':'relative'}}>
                    <PaperDropdownComponent dropdownButton={ddButton} dropdownStyle='garageselector'>
                        <div className='dropdown-button close-dropdown-button' style={{'minWidth':'195px'}}>Göteborg/Mölndal</div>
                        <div className='dropdown-button' ref='lvl3'>Kungsbacka</div>
                        <div className='dropdown-button'>Mölndal - Mercedes-Benz</div>
                        <div className='dropdown-button'>Mölndal - Nissan</div>
                        <div className='dropdown-button'>Sisjön</div>
                    </PaperDropdownComponent>
                    <p className='small'>4 st anläggningar</p>
                </div>
            );
        } else if (this.props.view === 'garage3') {
            var ddButton = ( 
                <div className='big' style={{'cursor':'pointer'}}>Kungsbacka <i className='fa fa-caret-down' /></div> 
            );
            leftPartRender = (
                <div className='text' style={{'position':'relative'}}>
                    <PaperDropdownComponent dropdownButton={ddButton} dropdownStyle='garageselector'>
                        <div className='dropdown-button close-dropdown-button' style={{'minWidth':'195px'}}>Kungsbacka</div>
                        <div className='dropdown-button'>Johan Snar</div>
                        <div className='dropdown-button'>Kalle Karlsson</div>
                        <div className='dropdown-button'>Armin Softic</div>
                        <div className='dropdown-button'>Glenn Bengtsson</div>
                        <div className='dropdown-button'>Steve Kula</div>
                    </PaperDropdownComponent>
                    <p className='small'>5 st anställda</p>
                </div>
            );
        } else if (this.props.view === 'admin') {
            leftPartRender = (
                <div className='text'>
                    <p className='big'>Målsättning</p>
                    <p className='small'>Målen uppnådda på 38/41 anläggningar</p>
                </div>
            );
            middlePartRender = (
                <div className='middle-header-part'>
                    <CurrentGoal goal='Debiterad tid' number='80' desc='%' />
                    <CurrentGoal goal='Intäkt per närvaro h' number='850' desc='kr/h' />
                    <CurrentGoal goal='Frånvaro' number='20' desc='%' />
                </div>
            );
        } else if (this.props.view === 'admin2') {
            leftPartRender = (
                <div className='text' style={{'position':'relative'}}>
                    <p className='big'>Användare</p>
                    <p className='small'>Redigera behörighet</p>
                </div>
            );
            middlePartRender = (
                <div className='middle-header-part'>
                    <UserEditing infoType='Namn' text='Johan Snar' />
                    <UserEditing infoType='Region/Anläggning' text='Kungsbacka' dropPick={true} />
                    <UserEditing infoType='E-post' text='johansnar@hedinbil.se' />
                </div>
            );
            var alternativeButton = (
                <ContentButton icon='fa-gear' label='Alternativ' />
            );
            rightPartRender = (
                <div className='right-header-part'>
                    <PaperDropdownComponent dropdownButton={alternativeButton} dropdownStyle='listview'>
                        <div className='dropdown-button close-dropdown-button'>Skicka nytt lösenord</div>
                        <div className='dropdown-button'>Ta bort användare</div>
                        <div className='dropdown-button'>Skapa ny användare</div>
                    </PaperDropdownComponent>
                </div>
            );
        } else if (this.props.view === 'list') {
            leftPartRender = (
                <div className='text'>
                    <p className='big'>Listvy</p>
                    <p className='small'>41st anläggningar</p>
                </div>
            );
            middlePartRender = (
                <div className='middle-header-part'>
                    <ListToggleFilter />
                </div>
            );
        } else if (this.props.view === 'settings') {
            leftPartRender = (
                <div className='text'>
                    <p className='big'>Inställningar</p>
                    <p className='small'>Inloggad som Jakob Werner</p>
                </div>
            );
        }
        return (
            <div className='content-header'>
                <div className='left-header-part'>
                    <div className='icon'><i className={'fa fa-' + this.props.icon} /></div>
                    {leftPartRender}
                </div>
                {middlePartRender}
                {rightPartRender}
            </div>
        );
    }
});

module.exports = ContentHeaderComponent;
