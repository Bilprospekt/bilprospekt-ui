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
                                <br key={1} />,
                            '\t<Option value="first" label="first option" />',
                                <br key={3} />,
                            '\t<Option value="second" label="second option" />',
                                <br key={5} />,
                            '\t<Option value="third" label="third option" />',
                                <br key={7} />,
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
