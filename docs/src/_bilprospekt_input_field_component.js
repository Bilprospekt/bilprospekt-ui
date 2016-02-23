import React from 'react';

import {InputField} from 'bilprospekt-ui';

const InputFieldDoc = React.createClass({
    render() {
        return (
            <div id='InputFieldDoc'>
                <p className="table-header-label">Input Field</p>
                <InputField icon='fa-search' hint='Search here' />

                <pre>
                <code>
                    {
                        [
                        '<InputField />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default InputFieldDoc;
