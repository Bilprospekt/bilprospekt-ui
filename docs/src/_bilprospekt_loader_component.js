import React from 'react';
import _ from 'underscore';

import {Loader} from 'bilprospekt-ui';

const LoaderDoc = React.createClass({
    render() {
        const divStyle = ({
            position: 'relative',
            height: '200px',
            width: '100%',
            border: '1px solid #E0E0E0',
        });

        return (
            <div>
                <p className="table-header-label">Loader</p>
                <div style={divStyle}>
                    <Loader width={25} message='Laddar in dina listor ...' />
                </div>

                <pre>
                <code>
                    {
                        [
                        '<Loader width={25} message="Laddar in dina listor ..." />',
                        ]
                    }
                </code>
                </pre>
            </div>
        );
    },
});

export default LoaderDoc;
