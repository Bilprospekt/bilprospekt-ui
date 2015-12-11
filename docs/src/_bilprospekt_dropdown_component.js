import React from 'react';
import * as BUI from 'bilprospekt-ui'
import _ from 'underscore';

const {DropdownMenu: {DropdownHolder, DropdownElement}} = BUI;
import {DatePicker} from 'bilprospekt-ui';

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
                         <br key={1} />,
                        '\t<DropdownElement checkbox label="My first element" />',
                         <br key={3} />,
                        '\t<DropdownElement label="My second element" />',
                         <br key={5} />,
                        '\t<DropdownElement disabled label="My third element" />',
                         <br key={7} />,
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
                         <br key={1}/>,
                         '{An array of 1000 elements}',
                         <br key={3} />,
                        '</DropdownHolder>',
                        ]
                    }
                </code>
                </pre>

                <p style={{marginTop: 20}}>With autoSize prop.</p>
                <DropdownHolder label="My Dropdown" icon="fa-cogs" autoSize={true}>
                    <DatePicker useRange />
                </DropdownHolder>

                <pre>
                <code>
                    {
                        ['<DropdownHolder label="My Dropdown" icon="fa-cogs" autoSize="true">',
                         <br key={1} />,
                        '\t<DatePicker useRange />',
                         <br key={3} />,
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
