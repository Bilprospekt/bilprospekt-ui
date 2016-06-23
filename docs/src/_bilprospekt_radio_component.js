import React from 'react';
import _ from 'underscore';

import {Radio} from 'bilprospekt-ui';
const {RadioButton, RadioButtonGroup} = Radio;

const RadioDoc = React.createClass({
    render() {
        return (
            <div id='RadioDoc'>
                <p className="table-header-label">Radio</p>
                <RadioButtonGroup name="radio-test">
                    <RadioButton value='first' label="First radio" />
                    <RadioButton value='second' label="Second radio" />
                    <RadioButton value='disabled' disabled label="Disabled radio" />
                    <RadioButton value='third' label="Third radio" />
                </RadioButtonGroup>

                <pre>
                <code>
                    {
                        [
                            "<RadioButtonGroup name='radio-test'>",
                                <br key={1} />,
                            "\t<RadioButton value='first' label='First radio' />",
                                <br key={3} />,
                            "\t<RadioButton value='second' label='Second radio' />",
                                <br key={5} />,
                            "\t<RadioButton value='disabled' disabled label='Disabled radio' />",
                                <br key={7} />,
                            "\t<RadioButton value='third' label='Third radio' />",
                                <br key={9} />,
                            "</RadioButtonGroup>",
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default RadioDoc;
