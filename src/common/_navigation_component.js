import React, { Component } from 'react';

var NavigationComponent = React.createClass({
	componentDidMount() {
		var that = this;
    $('#navigation-wrapper ul:first-of-type li').click(function(){
      if ($(this).hasClass('dropdown')) {
        $(this).toggleClass('show-children');
      } else {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        that._closeNav();
      }
		});
	},
  _closeNav() {
    $('#navigation-wrapper').removeClass('visible');
    $('#site-overflow-holder').removeClass('navigation-visible');
    $('#header-wrapper .open').toggleClass('closed open');
  },

	render() {
      // Highlights the navigation
      var indexClass = (this.props.view === 'index') ? 'selected' : null ;
      var listClass = (this.props.view === 'list') ? 'selected' : null ;
      var adminClass = (this.props.view === 'admin') ? 'selected' : null ;
      var settingsClass = (this.props.view === 'settings') ? 'selected' : null ;

    	return (
      		<div id='navigation-wrapper'>
            <div className='nav-top'>
              <p className='logo-text'>Bilprospekt</p>
            </div>
            <div className='navigation-slider'>	
        			<ul>
        				<p>Hedin Toolbox</p>
        				<a href='/'><li className={indexClass}><i className='fa fa-wrench' /><span>Verkstad</span></li></a>
        				<a href='/list'><li className={listClass}><i className='fa fa-align-left' /><span>Listvy</span></li></a>
        				<a href='/settings'><li className={settingsClass}><i className='fa fa-gear' /><span>Inställningar</span></li></a>
        				<li className='dropdown'><i className='fa fa-shield' /><span>Admin</span><i className='fa fa-caret-right' />
                  <ul>
                    <a href='/admin'><li className={adminClass}><span>Målsättning</span></li></a>
                    <a href='/admin2'><li><span>Användare</span></li></a>
                  </ul>
                </li>
        			</ul>
        			<ul>
        				<p>Allmänt</p>
        				<li><i className='fa fa-heartbeat' /><span>Support</span></li>
        				<li><i className='fa fa-sign-out' /><span>Logga ut</span></li>
        			</ul>
            </div>
      		</div>
    	);
  	}
});

module.exports = NavigationComponent;
