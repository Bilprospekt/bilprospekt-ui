import React from 'react';

import * as BUI from 'bilprospekt-ui';

const {
    Toolbar: {MainHolder, Button, DropdownHolder, DropdownElement}
} = BUI;

const ToolbarDocComponent = React.createClass({
    render() {
        return (
            <div id='ToolbarDoc'>
                <p className='table-header-label'>Toolbar</p>
                <MainHolder>
                    <Button label='Skapa affär' icon='fa-plus' />
                    <Button label='Kommentera' icon='fa-comment' disabled={true} />
                    <DropdownHolder label='Filter' icon='fa-filter'>
                        <DropdownElement label='Knapp 1' />
                        <DropdownElement label='Knapp 2' />
                        <DropdownElement label='Knapp 3' disabled={true} />
                    </DropdownHolder>
                    <DropdownHolder label='Inställningar' icon='fa-gear'>
                        <DropdownElement label='Knapp 1' checkbox={true} />
                        <DropdownElement label='Knapp 2' checkbox={true} />
                        <DropdownElement label='Knapp 3' checkbox={true} checkboxChecked={true} />
                        <DropdownElement label='Knapp 5' checkbox={true} disabled={true} />
                        <DropdownElement label='Knapp 6' checkbox={true} />
                        <DropdownElement label='Knapp 7' checkbox={true} />
                        <DropdownElement label='Knapp 8' checkbox={true} />
                        <DropdownElement label='Knapp 9' checkbox={true} />
                        <DropdownElement label='Knapp 0' checkbox={true} />
                    </DropdownHolder>
                    <DropdownHolder label='Överblick' icon='fa-eye' disabled={true}>
                        <DropdownElement label='Knapp 1' checkbox={true} />
                        <DropdownElement label='Knapp 2' checkbox={true} />
                        <DropdownElement label='Knapp 3' checkbox={true} />
                    </DropdownHolder>
                </MainHolder>

                <pre>
                <code>
                    {
                        [
                        '<MainHolder>',
                        '\n\t <Button label="Skapa affär" icon="fa-plus" />',
                        '\n\t <Button label="Kommentera" icon="fa-comment" disabled={true} />',
                        '\n\t <DropdownHolder label="Filter" icon="fa-filter">',
                        '\n\t\t <DropdownElement label="Knapp 1" />',
                        '\n\t\t <DropdownElement label="Knapp 2" disabled={true} />',
                        '\n\t\t <DropdownElement label="Knapp 2" checkbox={true} />',
                        '\n\t\t <DropdownElement label="Knapp 2" checkbox={true} disabled={true} />',
                        '\n\t\t <DropdownElement label="Knapp 2" checkbox={true} checkboxChecked={true} />',
                        '\n\t </DropdownHolder>',
                        '\n</MainHolder>'
                        ]
                    }
                </code>
                </pre>
            </div>
        );
    }

});

export default ToolbarDocComponent;
