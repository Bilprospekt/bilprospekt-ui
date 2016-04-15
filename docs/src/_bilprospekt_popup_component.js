import React from 'react';

import {Popup, ActionButton} from 'bilprospekt-ui';

const PopupDoc = React.createClass({
    getInitialState() {
        return {
            cfw: false,
        };
    },

    toggleCFW() {
        this.setState({ cfw: !this.state.cfw });
    },

    render() {

        const popupButton = <ActionButton label='Open Popup' primary style={{marginBottom: 20}} />;
        const popupContent = (
            <div style={{height: 500}}>
                Would you like to close this popup?
                <p style={{marginTop: 10, cursor: 'pointer', color: 'blue'}} onClick={this.toggleCFW}>Toggle contentFullWidth</p>
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
                    contentFullWidth={this.state.cfw}
                >
                    {popupContent}
                </Popup>


                <pre>
                <a href='https://github.com/tajo/react-portal'>https://github.com/tajo/react-portal</a>
                <code>
                    {
                        [
                        '<Popup',
                        '\n\topenBy={node}',
                        '\n\tonAction={function}',
                        '\n\ttitle="string"',
                        '\n\tactionLabel="string"',
                        '\n\tcloseLabel="string"',
                        '\n\tcontentFullWidth={bool}',
                        '\n\t>',
                        '\n\t{popupContent}',
                        '\n</Popup>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default PopupDoc;
