import React from 'react';
import DayPicker from 'react-day-picker';
const DateUtils = DayPicker.DateUtils;
import moment from 'moment';
import _ from 'underscore';

const DatePicker = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
    },
    getInitialState() {
        return {
            range: {from: null, to: null},
            initialMonth: new Date(),
        }
    },
    _onDayClick(e, day, modifiers) {
        let newSelections;
        const dayStr = day.toString();
        const newRange = DateUtils.addDayToRange(day, this.state.range);

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(newRange);
        }

        this.setState({
            range: newRange,
        });
    },
    render() {
        const selected = (day) => {
            return DateUtils.isDayInRange(day, this.state.range);
        };

        const fromMonth = moment("2005-01-01").toDate();
        const toMonth = moment().toDate();

        return (
            <DayPicker
            fromMonth={fromMonth}
            toMonth={toMonth}
            initialMonth={this.state.initialMonth}
            numberOfMonths={1}
            modifiers={{ selected }}
            onDayClick={this._onDayClick}
            captionElement={
                <CaptionElement onChange={(initialMonth) => this.setState({initialMonth})} date={this.state.initialMonth} />
            }
                />
        );
    }
});

const CaptionElement = React.createClass({
    propTypes: {
        date: React.PropTypes.object,
        onChange: React.PropTypes.func,
    },
    _handleChange(e) {
        const {year, month} = e.target.form;
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(new Date(year.value, month.value));
        }
    },
    render() {
        const date = this.props.date;
        const months = moment.months();

        let years = [];
        const y = moment().subtract(10, 'years');
        while (y.year() <= moment().year()) {
            years.push(y.year());
            y.add(1, 'year');
        }

        return (
            <form className="DayPicker-Caption">
                <select name="month" onChange={ this._handleChange } value={ date.getMonth() }>
                    { _(months).map((month, i) =>
                                <option key={ i } value={ i }>
                                { month }
                                </option>)
                    }
                </select>
                <select name="year" onChange={ this._handleChange } value={ date.getFullYear() }>
                    { _(years).map((year, i) =>
                                <option key={ i } value={ year }>
                                { year }
                                </option>)
                    }
                </select>
            </form>
        );
    },
});

export default DatePicker;
