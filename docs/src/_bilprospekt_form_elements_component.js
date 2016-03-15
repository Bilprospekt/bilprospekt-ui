import React from 'react';

import {Checkbox, Toggle} from 'bilprospekt-ui';

const FormElementsDoc = React.createClass({
    getInitialState() {
        return {
            checked: { cb2: true }
        };
    },
    toggleFormElements(event, isChecked) {
        let checked = this.state.checked;
        if (!isChecked) {
            delete checked[event.target.id];
        } else {
            checked[event.target.id] = isChecked;
        }
        this.setState({checked: checked});
    },
    render() {
        return (
            <div id='FormElementsDoc'>
                <p className="table-header-label">Form Elements</p>
                <Checkbox id='cb1' label='Option 1' checked={this.state.checked['cb1']} onChange={this.toggleFormElements} />
                <Checkbox id='cb2' label='Option 2' checked={this.state.checked['cb2']} onChange={this.toggleFormElements} />
                <Checkbox id='cb3' label='Option 3' disabled={true} checked={this.state.checked['cb3']} onChange={this.toggleFormElements} />

                <div style={{width:140}}>
                <Toggle id='t1' label='Feel Good' checked={this.state.checked['t1']} onChange={this.toggleFormElements} />
                </div>

                <pre>
                <code>
                    {
                        [
                        '<Checkbox />',
                            "\n<Toggle id='t1' label={string} checked={bool} onChange={(event, isChecked) => {}} />",
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default FormElementsDoc;
