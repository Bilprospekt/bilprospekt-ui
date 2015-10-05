var React = require('react');
var BUI = require('./lib/index.js');

var ActionButton = BUI.ActionButton;

var BilprospektUiComponent = React.createClass({
  render: function() {
    return (
      <div>
        <ActionButton primary label='Primary Action Button' />
      </div>
    );
  }
});

React.render(
  <BilprospektUiComponent />, document.getElementById('bilpui')
);
