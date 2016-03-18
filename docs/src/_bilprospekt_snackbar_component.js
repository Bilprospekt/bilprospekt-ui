import React from 'react';

import {Snackbar, ActionButton} from 'bilprospekt-ui';
import Portal from 'react-portal';

const SnackbarDoc = React.createClass({
    render() {

        const snackbarButton = <ActionButton label='Show Snackbar' primary />

        return (
            <div id='SnackbarDoc'>
                <p className="table-header-label">Snackbar</p>
                <Portal closeOnEsc openByClickOn={snackbarButton}>
                    <Snackbar
                        message='roflmao'
                        closeLabel='Stäng'
                        />
                </Portal>

                <pre>
                <a href='https://github.com/tajo/react-portal'>https://github.com/tajo/react-portal</a>
                <code>
                    {
                        [
                        '<Portal closeOnEsc openByClickOn={popupButton}>',
                        '\n\t<Snackbar onAction={(value) => {}} title="This is a nice popup" actionLabel="Sounds good" closeLabel="No way">',
                        '\n\t\t{popupContent}',
                        '\n\t</Popup>',
                        '\n</Portal>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default SnackbarDoc;
