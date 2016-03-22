import React from 'react';

import {Tooltip, ActionButton} from 'bilprospekt-ui';

const TooltipDoc = React.createClass({
    render() {
        const tooltipArray = [
            "Now this is tooltipping!", 
            "With extra rows!", 
            "Ok, now I'm just showing off..",
            "Row 4",
            "Row 5",
            "Row 6",
            "Row 7",
            "Row 8",
            "Row 9",
            "Row 10",
            "Row 11",
            "Row 12",
        ];
        const tooltipStyle = ({
            display: 'inline-block',
            margin: 5
        })

        return (
            <div id='TooltipDoc'>
                <p className="table-header-label">Tooltip</p>
                <a href='https://github.com/tajo/react-portal'>https://github.com/tajo/react-portal</a>
                <br />

                <Tooltip style={tooltipStyle} string='Hover String That Is Super Long. Literally Two sentences! Ok I lied, this string is even longer than you thought! This string is so long, that it will get cut off by the screen width..' position='bottom' space={0} delay={0}>
                    <ActionButton secondary label='Tooltip Bottom' />
                </Tooltip>

                <Tooltip style={tooltipStyle} string='This tooltip has a max-width prop that allows you to decide the width of if.' maxWidth={150} position='top' space={5} delay={200}>
                    <ActionButton secondary label='Tooltip Top' />
                </Tooltip>

                <Tooltip style={tooltipStyle} string='Now this is tooltipping!' header='Tooltip Header' position='left' space={0} delay={0}>
                    <ActionButton secondary label='Tooltip Left' />
                </Tooltip>

                <Tooltip style={tooltipStyle} rows={tooltipArray} position='right' space={10} delay={0}>
                    <ActionButton secondary label='Tooltip Right' />
                </Tooltip>

                <br />

                <pre>
                <code>
                    {
                        [
                        '<Tooltip',
                        '\n\t string="string"',
                        '\n\t rows={array}',
                        '\n\t header="string"',
                        '\n\t position="string"',
                        '\n\t maxWidth={number}',
                        '\n\t space={number}',
                        '\n\t delay={number}',
                        '\n/>',
                        '\n\t<ActionButton />',
                        '\n</Tooltip>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default TooltipDoc;