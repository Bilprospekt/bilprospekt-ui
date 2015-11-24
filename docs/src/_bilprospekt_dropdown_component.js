import React from 'react';
import * as BUI from 'bilprospekt-ui'

const {DropdownMenu: {DropdownHolder, DropdownElement}} = BUI;

const DropDownDoc = React.createClass({
    render() {
        return (
            <div>
                <p className="table-header-label">Dropdown menu</p>
                <DropdownHolder label="My Dropdown" icon="fa-cogs">
                    <DropdownElement checkbox label="My first element" />
                    <DropdownElement label="My second element" />
                    <DropdownElement disabled label="My third element" />
                </DropdownHolder>

                <pre>
                <code>
                    {
                        ['<DropdownHolder label="My Dropdown" icon="fa-cogs">',
                        <br/>,
                        '\t<DropdownElement checkbox label="My first element" />',
                        <br/>,
                        '\t<DropdownElement label="My second element" />',
                        <br/>,
                        '\t<DropdownElement disabled label="My third element" />',
                        <br/>,
                        '</DropdownHolder>',
                        ]
                    }
                </code>
                </pre>
            </div>
        );
    },
});

export default DropDownDoc;
