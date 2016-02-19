import React from 'react';

import {InlineEdit} from 'bilprospekt-ui';

const InlineEditDoc = React.createClass({
    render() {
        return (
            <div>
                <p className="table-header-label">Inline Edit</p>
                <InlineEdit icon='fa-search' string='Editable text' />

                <pre>
                <code>
                    {
                        [
                        '<InlineEdit />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default InlineEditDoc;
