var React = require('react');
var BilprospektUiComponent = require('./component.js');

document.addEventListener("DOMContentLoaded", function(event) {
  console.log('ok!');
  React.render(
    BilprospektUiComponent(), document.getElementById('bilpui')
  );
});

console.log('o2k!');

document.write('Ninja');
