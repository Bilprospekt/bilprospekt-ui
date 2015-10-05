import React from 'react';
import BUI from '../../lib/index.js';
console.log('o2k!');

const ActionButton = BUI.ActionButton;

const BilprospektUiComponent = React.createClass({
  render: function() {
    return (
      <div>
        <ActionButton primary label='Primary Action Button' />
      </div>
    );
  }
});

export default BilprospektUiComponent;
