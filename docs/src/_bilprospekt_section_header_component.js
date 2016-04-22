import React from 'react';

import {SectionHeader} from 'bilprospekt-ui';

const SectionHeaderDoc = React.createClass({
    render() {
        return (
            <div id='SectionHeaderDoc'>
                <p className="table-header-label">Section Header</p>
                <SectionHeader highlighted icon='fa-user' label='User Profile' desc='This user is highlighted' style={{marginBottom: 20}} />
                <SectionHeader icon='fa-comment' label='Comment Section' desc='This is where we comment on stuff' style={{marginBottom: 20}} />
                <SectionHeader icon='fa-users' label='Party Section' desc={['Peter', 'Daniel', 'Alexander']} style={{marginBottom: 20}} />
                <SectionHeader icon='fa-car' label='Car Section' desc='Something minor happened!' descType='minor' style={{marginBottom: 20}} />
                <SectionHeader icon='fa-building' label='Company Section' desc='Something major happened!' descType='major' style={{marginBottom: 20}} />

                <pre>
                <code>
                    {
                        [
                        '<SectionHeader',
                        '\n\t icon="string"',
                        '\n\t label="string"',
                        '\n\t desc="string" || desc=[array]',
                        '\n\t descType="minor" || descType="major"',
                        '\n\t style={object}',
                        '\n\t highlighted={bool}',
                        '\n/>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default SectionHeaderDoc;