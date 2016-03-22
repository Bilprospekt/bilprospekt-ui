import React from 'react';

import {Snackbar, ActionButton} from 'bilprospekt-ui';
import Portal from 'react-portal';

const SnackbarDoc = React.createClass({
    render() {
        const snackbarTrigger = <ActionButton label='Show Snackbar' primary />;
        return (
            <div id='SnackbarDoc'>
                <p className="table-header-label">Snackbar</p>

                <Snackbar isOpenedBy={snackbarTrigger} header='Snackbar Header' message='This is a normal text string on a snackbar' />

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
