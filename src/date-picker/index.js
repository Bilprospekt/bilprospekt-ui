import React from 'react';
import DayPicker from 'react-day-picker';
const DateUtils = DayPicker.DateUtils;
import LocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import _ from 'underscore';

const DatePicker = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,

        //If we want to use a range, default is TRUE
        useRange: React.PropTypes.bool,

        //Language to use in datepicker. Since it depends on moment, be sure to load correct language files for moment.js
        locale: React.PropTypes.string,
    },
    getInitialState() {
        return {
            range: {from: null, to: null},
            date: null,
            initialMonth: new Date(),
        }
    },
    getDefaultProps() {
        return {
            useRange: true,
            locale: 'en',
        };
    },
    _onDayClick(e, day, modifiers) {
        let newSelections;

        if (this.props.useRange) {
            const newRange = DateUtils.addDayToRange(day, this.state.range);

            if (typeof this.props.onChange === 'function') {
                this.props.onChange(newRange);
            }

            this.setState({
                range: newRange,
            });
        } else {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(day);
            }

            this.setState({
                date: day,
            });
        }
    },
    render() {
        const selected = (day) => {
            if (this.props.useRange) {
                return DateUtils.isDayInRange(day, this.state.range);
            } else {
                return day == this.state.date.toString();
            }
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
            locale={ this.props.locale }
            localeUtils={ LocaleUtils }
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
