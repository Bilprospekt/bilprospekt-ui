import React from 'react';

import {BaseWrapper} from 'bilprospekt-ui';

const BaseWrapperDoc = React.createClass({
    render() {
        return (
            <div>
                <p className="table-header-label">Base Wrapper</p>
                <BaseWrapper>
                    this.props.children
                </BaseWrapper>

                <pre>
                    <code>
                        {
                            [
                            '<BaseWrapper>',
                                <br />,
                                '\tthis.props.children',
                                <br />,
                            '</BaseWrapper>',
                            ]
                        }
                    </code>
                </pre>
            </div>
        );
    },
});

export default BaseWrapperDoc;