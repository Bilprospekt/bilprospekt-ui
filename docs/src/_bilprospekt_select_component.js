import React from 'react';
import _ from 'underscore';

import {Select, Option} from 'bilprospekt-ui';

const SelectDoc = React.createClass({
    render() {
        return (
            <div>
                <p className="table-header-label">Select</p>
                <Select>
                    <Option value="first" label="first option" />
                    <Option value="second" label="second option" />
                    <Option value="third" label="third option" />
                </Select>

                <pre>
                <code>
                    {
                        [
                        '<Select>',
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