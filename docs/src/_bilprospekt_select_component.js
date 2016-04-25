import React from 'react';
import _ from 'underscore';

import {Select, Option} from 'bilprospekt-ui';

const SelectDoc = React.createClass({
    render() {
        return (
            <div id='SelectDoc'>
                <p className="table-header-label">Select</p>
                <Select disabled>
                    <Option value="first" label="first option" />
                    <Option value="second" label="second option" />
                    <Option value="third" label="third option" />
                </Select>

                <Select defaultSelectedValue="second">
                    <Option value="first" label="first option" />
                    <Option value="second" label="second option" />
                    <Option value="third" label="third option" />
                </Select>

                <pre>
                <code>
                    {
                        [
                        '<Select disabled={bool} onChange={func} defaultSelectedValue="second">',
                                <br />,
                            '\t<Option value="first" label="first option" />',
                                <br />,
                            '\t<Option value="second" label="second option" />',
                                <br />,
                            '\t<Option value="third" label="third option" />',
                                <br />,
                        '</Select>',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default SelectDoc;
