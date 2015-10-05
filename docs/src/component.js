import React from 'react';
import {ActionButton} from '../../lib/index.js';

const BilprospektUIComponent = React.createClass({
    render: function() {
        return (
            <div>
                <ActionButton primary label="Primary Action Button" />
                <div style={{clear: 'both'}} />
                <ActionButton secondary label="Secondary Action Button" />
            </div>
        );
    }
});

export default BilprospektUIComponent;
