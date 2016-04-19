import React from 'react';

import {SectionHeader} from 'bilprospekt-ui';

const SectionHeaderDoc = React.createClass({
    render() {
        return (
            <div id='SectionHeaderDoc'>
                <p className="table-header-label">Section Header</p>
                <SectionHeader icon='fa-comment' label='Comment Section' desc='This is where we comment on stuff' style={{marginBottom: 20}} />

                <pre>
                <code>
                    {
                        [
                        '<SectionHeader />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default SectionHeaderDoc;