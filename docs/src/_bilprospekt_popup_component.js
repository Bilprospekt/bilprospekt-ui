import React from 'react';

import {Popup, ActionButton} from 'bilprospekt-ui';
import Portal from 'react-portal';

const PopupDoc = React.createClass({
    render() {

        const popupButton = <ActionButton label='Open Popup' primary style={{marginBottom: 20}} />;
        const popupContent = (
            <div style={{height: 500}}>
                Would you like to close this popup?
            </div>
        );

        return (
            <div id='PopupDoc'>
                <p className="table-header-label">Popup</p>
                    <Popup
                        openBy={popupButton}
                        onAction={(value) => {}}
                        title='This is a nice popup'
                        actionLabel='Sounds good'
                        closeLabel='No way'
                    >
                        {popupContent}
                    </Popup>

                <pre>
                <a href='https://github.com/tajo/react-portal'>https://github.com/tajo/react-portal</a>
                <code>
                    {
                        [
                        '<Portal closeOnEsc openByClickOn={popupButton}>',
                        '\n\t<Popup onAction={(value) => {}} title="This is a nice popup" actionLabel="Sounds good" closeLabel="No way">',
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

export default PopupDoc;
