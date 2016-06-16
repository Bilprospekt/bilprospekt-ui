require('./highlight.css');
hljs.initHighlightingOnLoad();

var debug = require('debug');
window.debug = debug;
var React = require('react');
var ReactDOM = require('react-dom');
var BilprospektUiComponent = require('./_bilprospekt_ui_component.js');

var moment = require('moment');
moment.locale('sv');

ReactDOM.render(
  React.createElement(BilprospektUiComponent), document.getElementById('bilpui')
);
