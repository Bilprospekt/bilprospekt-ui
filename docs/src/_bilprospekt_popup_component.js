import React from 'react';

import {Popup} from 'bilprospekt-ui';
import {ActionButton} from 'bilprospekt-ui';

const PopupDoc = React.createClass({
    render() {

        const popupButton = <ActionButton label='Open Popup' primary style={{marginBottom: 20}} />;
        const popupContent = (
            <div>
                Lorem ipsum roflmao
            </div>
        );

        return (
            <div>
                <p className="table-header-label">Popup</p>
                <Popup
                    button={popupButton}
                    title='This is a nice popup'
                    content={popupContent}
                    actionLabel='Sounds good'
                    closeLabel='No way'
                />

                <pre>
                <code>
                    {
                        [
                        '<Popup',
                            <br />,
                            '\tbutton={component}',
                            <br />,
                            '\ttitle="string"',
                            <br />,
                            '\tcontent={component}',
                            <br />,
                            '\tactionLabel="string"',
                            <br />,
                            '\tcloseLabel="string"',
                            <br />,
                        '/>',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default PopupDoc;
