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
            singleDate: null,
        };
    },
    _onChange(range) {
        this.setState({range});
    },
    _onSingleChange(singleDate) {
      this.setState({singleDate});
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

        let dateSingleStr = '';
        if (this.state.singleDate) {
          dateSingleStr = this._formatDate(this.state.singleDate);
        }

        return (
            <div id='DatePickerDoc'>
                <p className="table-header-label">Datepicker</p>
                <p style={{height: 60}}>Built upon <a target="_blank" href="https://github.com/gpbl/react-day-picker">react-day-picker</a></p>
                <div style={{float: 'left'}}>
                  <p style={{textAlign: 'center'}}>{dateStr}</p>
                  <DatePicker maxDate={moment().add(0, 'years').month(3).date(15)} minDate={moment().subtract(1, 'year').month(5).date(14)} useRange onChange={this._onChange} />
                </div>
                <div style={{float: 'left', marginLeft: 100}}>
                  <p style={{textAlign: 'center'}}>{dateSingleStr}</p>
                  <DatePicker maxDate={moment().add(0, 'years').month(3).date(15)} minDate={moment().subtract(1, 'year').month(5).date(14)} useRange={false} onChange={this._onSingleChange} />
                </div>
                <div style={{clear: 'both'}} />
                <pre>
                <code>
                    {
                        [
                          "// Range (left)",
                          <br/>,
                          "<DatePicker maxDate={moment().add(0, 'years').month(3).date(15)} minDate={moment().subtract(1, 'year').month(5).date(14)} useRange onChange={this._onChange} />",
                          <br/>,
                          <br/>,
                          "// Single (right)",
                          <br/>,
                          "<DatePicker maxDate={moment().add(0, 'years').month(3).date(15)} minDate={moment().subtract(1, 'year').month(5).date(14)} useRange={false} onChange={this._onSingleChange} />",
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default DatePickerDoc;
