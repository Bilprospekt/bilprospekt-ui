import React from 'react';

import {ActionButton} from 'bilprospekt-ui';

const ActionButtonDoc = React.createClass({
    render() {
        return (
            <div id='ActionButtonDoc'>
                <p className="table-header-label">Action Button</p>
                <ActionButton primary={false} minor={true} label='Action Button'/>

                <pre>
                <code>
                    {
                        [
                        '<ActionButton />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default ActionButtonDoc;
