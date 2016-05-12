import React from 'react';

import {ActionButton} from 'bilprospekt-ui';

const ActionButtonDoc = React.createClass({
    _onClick() {
        console.log('working');
    },
    
    render() {
        return (
            <div id='ActionButtonDoc'>
                <p className="table-header-label">Action Button</p>
                <ActionButton primary={false} minor={true} label='Action Button' onClick={this._onClick}/>

                <pre>
                <code>
                    {
                        [
                        '<ActionButton',
                        '\n\t label="string"',
                        '\n\t primary={bool}',
                        '\n\t style={object}',
                        '\n\t selected={bool}',
                        '\n\t flat={bool}',
                        '\n\t toggle={bool}',
                        '\n/>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default ActionButtonDoc;
