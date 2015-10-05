var React = require('react');
var BilprospektUiComponent = require('./component.js');

document.addEventListener("DOMContentLoaded", function(event) {
  React.render(
    BilprospektUiComponent(), document.getElementById('bilpui')
  );
});

document.write('Ninja2');
