import React from 'react';

import {SectionHeader} from 'bilprospekt-ui';

const SectionHeaderDoc = React.createClass({
    render() {
        return (
            <div id='SectionHeaderDoc'>
                <p className="table-header-label">Section Header</p>
                <SectionHeader highlighted icon='fa-user' label='User Profile' desc='This user is highlighted' style={{marginBottom: 20}} />
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