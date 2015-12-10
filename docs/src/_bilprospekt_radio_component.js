import React from 'react';
import _ from 'underscore';

import {Radio} from 'bilprospekt-ui';
const {RadioButton, RadioButtonGroup} = Radio;

const RadioDoc = React.createClass({
    render() {
        return (
            <div>
                <p className="table-header-label">Radio</p>
                <RadioButtonGroup name="radio-test">
                    <RadioButton checked value='first' label="First radio" />
                    <RadioButton value='second' label="Second radio" />
                    <RadioButton value='disabled' disabled label="Disabled radio" />
                    <RadioButton value='third' label="Third radio" />
                </RadioButtonGroup>

                <pre>
                <code>
                    {
                        [
                            "<RadioButtonGroup name='radio-test'>",
                                <br/>,
                            "\t<RadioButton value='first' label='First radio' />",
                                <br/>,
                            "\t<RadioButton value='second' label='Second radio' />",
                                <br/>,
                            "\t<RadioButton value='disabled' disabled label='Disabled radio' />",
                                <br/>,
                            "\t<RadioButton value='third' label='Third radio' />",
                                <br/>,
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
