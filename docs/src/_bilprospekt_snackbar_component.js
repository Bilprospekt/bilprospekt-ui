import React from 'react';

import {Snackbar, ActionButton} from 'bilprospekt-ui';
import Portal from 'react-portal';

const SnackbarDoc = React.createClass({

    _openSnackbar() {
        console.log('open sb');
    },

    render() {
        const snackbarStyle = ({
            margin: 2,
            display: 'inline-block',
        });

        const successTrigger = <ActionButton label='Show Sucess Snackbar' primary />;
        const warningTrigger = <ActionButton label='Show Warning Snackbar' primary />;
        const infoTrigger = <ActionButton label='Show Info Snackbar' primary />;
        const waitingTrigger = <ActionButton label='Show Loading Snackbar' primary />;

        return (
            <div id='SnackbarDoc'>
                <p className="table-header-label" onClick={this._openSnackbar}>Snackbar</p>

                <Snackbar
                    isOpenedBy={successTrigger}
                    status='success'
                    message='This is a success message.'
                    showTime={10000}
                    style={snackbarStyle} />

                <Snackbar
                    isOpenedBy={warningTrigger}
                    status='warning'
                    message='This is a warning message.'
                    style={snackbarStyle} />

                <Snackbar
                    isOpenedBy={infoTrigger}
                    status='info'
                    message='This is a info message.'
                    style={snackbarStyle} />

                <Snackbar
                    isOpenedBy={waitingTrigger}
                    status='loading'
                    message='This is a loading message.'
                    style={snackbarStyle} />

                <Snackbar
                    ref='snackbarRef'
                    status='success'
                    message='Opened by function' />

                <pre>
                <a href='https://github.com/tajo/react-portal'>https://github.com/tajo/react-portal</a>
                <code>
                    {
                        [
                        '<Snackbar message="string" closeLabel="string">',
                        '\n\t<ActionButton />',
                        '\n</Snackbar>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default SnackbarDoc;
