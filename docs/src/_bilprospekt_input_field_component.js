import React from 'react';

import {InputField} from 'bilprospekt-ui';

const InputFieldDoc = React.createClass({
    render() {
        const inputStyle = ({
            margin: '10px 0',
        });

        return (
            <div id='InputFieldDoc'>
                <p className="table-header-label">Input Field</p>

                <InputField icon='fa-search' hint='Search here' style={inputStyle} />

                <InputField icon='fa-search' hint='Search with remove input button' fastRemove={true} style={inputStyle} />

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
