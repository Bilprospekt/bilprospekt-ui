import React from 'react';
import * as BUI from 'bilprospekt-ui'
import _ from 'underscore';

const {DropdownMenu: {DropdownHolder, DropdownElement}} = BUI;

const DropDownDoc = React.createClass({
    render() {
        const els = _(_.range(1000)).map((val) => {
            return (
                <DropdownElement key={val} checkbox label={`El ${val}`} />
            )
        });
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

                <div style={{clear: 'both'}} />

                <p style={{marginTop: 20}}>With infiniteScroll for perfomance boost. Very useful if we have lots of elements.</p>
                <DropdownHolder useInfiniteScroll label="My Infinite Dropdown" icon="fa-cogs">
                    {els}
                </DropdownHolder>

                <pre>
                <code>
                    {
                        ['<DropdownHolder useInfiniteScroll label="My Infinite Dropdown" icon="fa-cogs">',
                         <br/>,
                         '{An array of 1000 elements}',
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
