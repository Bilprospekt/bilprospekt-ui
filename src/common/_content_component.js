import React, { Component }   from 'react';

// Components
import ContentHeaderComponent from './_content_header_component';
import PaperComponent         from './_paper_component';

// Different View Components
import GarageViewComponent     from '../views/_garage_view_component';
import GarageLvl2ViewComponent from '../views/_garage_lvl2_view_component';
import GarageLvl3ViewComponent from '../views/_garage_lvl3_view_component';
import AdminViewComponent      from '../views/_admin_view_component';
import Admin2ViewComponent     from '../views/_admin2_view_component';
import ListViewComponent       from '../views/_list_view_component';
import SettingsViewComponent   from '../views/_settings_view_component';

var ContentComponent = React.createClass({
    _closeNav() {
        if ($('#navigation-wrapper').hasClass('visible')) {
            $('#navigation-wrapper').toggleClass('visible');
            $('#site-overflow-holder').toggleClass('navigation-visible');
            $('#header-wrapper .open').toggleClass('closed open');
        }
    },
    render() {
        var url = window.location.pathname;
        if (url === '/admin') {
            return (
                <div id='main-list-holder' onClick={this._closeNav}>
                    <ContentHeaderComponent icon='flag-checkered' view='admin' />
                    <AdminViewComponent />
                </div>
            );
        } else if (url === '/admin2') {
            return (
                <div id='main-list-holder' onClick={this._closeNav}>
                    <ContentHeaderComponent icon='users' view='admin2' />
                    <Admin2ViewComponent />
                </div>
            );
        } else if (url === '/list') {
            return (
                <div id='main-list-holder' onClick={this._closeNav}>
                    <ContentHeaderComponent icon='map-marker' view='list' />
                    <ListViewComponent />
                </div>
            );
        } else if (url === '/settings') {
            return (
                <div id='main-list-holder' onClick={this._closeNav}>
                    <ContentHeaderComponent icon='gear' view='settings' />
                    <SettingsViewComponent />
                </div>
            );
        } else if (url === '/garage2') {
            return (
                <div id='content-wrapper' onClick={this._closeNav}>
                    <ContentHeaderComponent icon='wrench' view='garage2' />
                    <GarageLvl2ViewComponent />
                </div>
            )
        } else if (url === '/garage3') {
            return (
                <div id='content-wrapper' onClick={this._closeNav}>
                    <ContentHeaderComponent icon='wrench' view='garage3' />
                    <GarageLvl3ViewComponent />
                </div>
            )
        } else {
            return (
                <div id='content-wrapper' onClick={this._closeNav}>
                    <ContentHeaderComponent icon='wrench' view='garage' />
                    <GarageViewComponent />
                </div>
            );
        }
    }
});

module.exports = ContentComponent;
