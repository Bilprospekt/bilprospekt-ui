import React from 'react';
import _     from 'underscore';

import {InputField, ActionButton} from 'bilprospekt-ui';

const InputFieldDoc = React.createClass({
    getInitialState() {
        return {
            inputStatus: 'default',
        };
    },

    _setStatus(status) {
        this.setState({ inputStatus: status });
    },

    render() {
        const inputStyle = ({
            marginBottom: 40,
            width: 250,
        });

        const divStyle = ({
            marginBottom: 40,
            width: 350,
            padding: '20px 0',
            borderTop: '1px solid #E0E0E0',
            borderBottom: '1px solid #E0E0E0',
        });

        return (
            <div id='InputFieldDoc'>
                <p className="table-header-label">Input Field</p>

                <InputField icon='fa-search' hint='Search here' floatingHint={true} style={inputStyle} />

                <InputField icon='fa-search' hint='Search with remove input button' fastRemove={true} style={inputStyle} />

                <InputField icon='fa-comment' hint='Write a comment (multiLine)' multiLine={true} fastRemove={true} style={inputStyle} />

                <InputField icon='fa-phone' hint='Only numbers (onlyNumbers)' onlyNumbers={true} style={inputStyle} />

                <div style={divStyle}>
                    <ActionButton label='Default' onClick={this._setStatus.bind(this, 'default')} />
                    <ActionButton label='Loading' onClick={this._setStatus.bind(this, 'loading')} style={{margin: '0 10px'}} /> 
                    <ActionButton label='Complete' onClick={this._setStatus.bind(this, 'complete')} /> 
                    <InputField icon='fa-pencil' hint='Enter some data' status={this.state.inputStatus} style={{marginTop: 20}} />
                </div>

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
