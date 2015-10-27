import React from 'react';

import * as BUI from 'bilprospekt-ui';

const {
    Toolbar: {MainHolder, Button, DropdownHolder, DropdownElement}
} = BUI;

const ToolbarDocComponent = React.createClass({
    render() {
        return (
            <div>
                <p className='table-header-label'>Toolbar</p>
                <table>
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
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
                            </td>
                            <td><p className='code-type type-component'>Component</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

});

export default ToolbarDocComponent;
