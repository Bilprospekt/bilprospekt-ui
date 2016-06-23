import React from 'react';

import {Chips} from 'bilprospekt-ui';

const ChipsDoc = React.createClass({
    render() {
        return (
            <div id='ChipsDoc'>
                <p className="table-header-label">Chips</p>
                <Chips label='Estrella Chip' onClick={this._onClick} />

                <pre>
                <code>
                    {
                        [
                        '<Chips label="Estrella Chip" onClick={function} />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default ChipsDoc;
