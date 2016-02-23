import React from 'react';

import {Popup, ActionButton} from 'bilprospekt-ui';

const PopupDoc = React.createClass({
    getInitialState() {
        return {
            popup: false,
        };
    },
    openPopup() {
        this.setState({popup: true});
    },
    hidePopup() {
        this.setState({popup: false});
    },
    getPopupProps() {
        let headerButton = <a href="#">Some Action</a>;
        let saveButton = <div className='popup-footer-button' onClick={this.hidePopup}>Save</div>;
        let closeButton = <div className='popup-footer-button' onClick={this.hidePopup}>Close</div>;
        return {
            onClose: this.hidePopup,
            header: {
                title: 'Popup',
                controls: {
                    headerButton
                }
            },
            footer: {
                controls: {
                    saveButton,
                    closeButton
                }
            }
        };
    },
    render() {
        let popup = null;
        if (this.state.popup) {
            popup = (
                <Popup {...this.getPopupProps()}>
                    This is a popup. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia interdum lorem, et iaculis tortor blandit eu. In vestibulum massa porttitor, efficitur ipsum quis, luctus purus. Phasellus felis nunc, molestie sit amet condimentum ut, bibendum congue odio. Donec dapibus enim id bibendum fermentum. Aenean interdum sem ornare dapibus porta. Nullam ut arcu at sem pharetra aliquet. Pellentesque convallis, purus a molestie molestie, nisi ipsum dapibus augue, auctor ultrices ipsum odio non nunc. Quisque vel eleifend massa, quis viverra tortor. Aenean fermentum metus aliquam rhoncus accumsan. Nullam sodales ullamcorper maximus. Vivamus venenatis, est a gravida fringilla, metus felis varius dui, vel cursus lectus massa eu diam. Praesent commodo finibus luctus. Nunc convallis mauris at facilisis tincidunt. Sed pulvinar elit metus, at interdum ligula feugiat vitae. Donec at finibus elit, placerat accumsan neque.
                </Popup>
            );
        }
        return (
            <div id='PopupDoc'>
                <p className="table-header-label">Popup</p>
                <ActionButton primary={false} minor={true} label='Open popup' onClick={this.openPopup}/>
                {popup}

                <pre>
                <code>
                    {
                        [
                        '<Popup />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default PopupDoc;
