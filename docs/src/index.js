require('./highlight.css');
require('react-day-picker/lib/style.css');
hljs.initHighlightingOnLoad();

var React = require('react');
var ReactDOM = require('react-dom');
var BilprospektUiComponent = require('./_bilprospekt_ui_component.js');

ReactDOM.render(
  React.createElement(BilprospektUiComponent), document.getElementById('bilpui')
);
