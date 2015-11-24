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
            </div>
        );
    },
});

export default DropDownDoc;
