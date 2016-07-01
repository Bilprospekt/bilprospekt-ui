import React from 'react';
import _     from 'underscore';

import {InputField} from 'bilprospekt-ui';

const InputFieldDoc = React.createClass({
    render() {
        const inputStyle = ({
            marginBottom: 40,
            width: 250,
        });

        return (
            <div id='InputFieldDoc'>
                <p className="table-header-label">Input Field</p>

                <InputField icon='fa-search' hint='Search here' floatingHint={true} style={inputStyle} />

                <InputField icon='fa-search' hint='Search with remove input button' fastRemove={true} style={inputStyle} />

                <InputField icon='fa-comment' hint='Write a comment (multiLine)' multiLine={true} fastRemove={true} style={inputStyle} />

                <InputField icon='fa-phone' hint='Only numbers (onlyNumbers)' onlyNumbers={true} style={inputStyle} />

                <pre>
                <code>
                    {
                        [
                        '<InputField',
                        '\n\t value="string"',
                        '\n\t icon="string"',
                        '\n\t hint="string"',
                        '\n\t floatingHint={bool}',
                        '\n\t multiLine={bool}',
                        '\n\t fastRemove={bool}',
                        '\n\t password={bool}',
                        '\n\t disabled={bool}',
                        '\n\t onlyNumbers={bool}',
                        '\n/>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default InputFieldDoc;
