import React from 'react';

import {ViewWrapper} from 'bilprospekt-ui';

const ViewWrapperDoc = React.createClass({
    render() {
        return (
            <div style={{height: 400}}>
                <p className="table-header-label">View Wrapper</p>
                <ViewWrapper cards={false}>
                    this.props.children
                </ViewWrapper>

                <pre>
                    <code>
                        {
                            [
                            '<ViewWrapper cards="false">',
                                <br />,
                                '\tthis.props.children',
                                <br />,
                            '</ViewWrapper>',
                            ]
                        }
                    </code>
                </pre>
            </div>
        );
    },
});

export default ViewWrapperDoc;