import React from 'react';
import _ from 'underscore';
import moment from 'moment';

import {DatePicker} from 'bilprospekt-ui';

const DatePickerDoc = React.createClass({
    getInitialState() {
        return {
            range: {
                from: null,
                to: null,
            },
        };
    },
    _onChange(range) {
        this.setState({range});
    },
    _formatDate(date) {
        return moment(date).format('YYYY-MM-DD');
    },
    render() {
        let dateStr = '';
        let del = '';
        const range = this.state.range;
        if (range.from) {
            dateStr = this._formatDate(range.from);
            del = ' - ';
        }

        if (range.to) {
            dateStr += del + this._formatDate(range.to);
        }

        return (
            <div id='DatePickerDoc'>
                <p className="table-header-label">Datepicker</p>
                <p style={{height: 60}}>Built upon <a target="_blank" href="https://github.com/gpbl/react-day-picker">react-day-picker</a></p>
                <p style={{textAlign: 'center'}}>{dateStr}</p>
                <DatePicker maxDate={moment().add(5, 'years')} useRange onChange={this._onChange} />
                <pre>
                <code>
                    {
                        ['<DatePicker useRange onChange={func} />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default DatePickerDoc;
