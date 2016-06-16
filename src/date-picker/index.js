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

    maxDate: React.PropTypes.object, //Moment date
    minDate: React.PropTypes.object, //Moment date
  },
  getInitialState() {
    // This may cause problems if we have multiple datepickers and multiple languages.
    moment.locale(this.props.locale);

    return {
      range: {from: null, to: null},
      date: null,
      initialMonth: moment(this.props.maxDate).toDate(),

      // We can't use this in defaultProps since we need locale from props before creating dates.
      maxDate: this.props.maxDate || moment(),
      minDate: this.props.minDate || moment().subtract(10, 'years').month(0).day(0),
    }
  },
  getDefaultProps() {
    return {
      useRange: true,
      locale: 'sv',
    };
  },
  _onDayClick(e, day, modifiers) {
    if (modifiers.indexOf('disabled') !== -1) return;

    let newSelections;

    if (this.props.useRange) {
      const newRange = DateUtils.addDayToRange(day, this.state.range);

      //Set range to include full days
      if (newRange.from) {
        newRange.from = moment(newRange.from).hour(0).minute(0).second(0).toDate();
      }

      if (newRange.to) {
        newRange.to = moment(newRange.to).hour(23).minute(59).second(59).toDate();
      }

      //If parent listens on onChange, trigger listener.
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
  getDate() {
    return (this.props.useRange) ? this.state.range : this.state.date;
  },
  _getIntervalDates() {
    return {
      maxDate: this.state.maxDate,
      minDate: this.state.minDate,
    };
  },
  render() {
    const {maxDate, minDate} = this._getIntervalDates();
    const isSelected = (day) => {
      if (this.props.useRange) {
        return DateUtils.isDayInRange(day, this.state.range);
      } else {
        return this.state.date && day == this.state.date.toString();
      }
    };

    const fromMonth = minDate.toDate();
    const toMonth = maxDate.toDate();

    const isDisabled = day => {
      return !DateUtils.isDayInRange(day, {
        from: minDate.toDate(),
        to: maxDate.toDate(),
      });
    }

    return (
      <DayPicker
      fromMonth={fromMonth}
      toMonth={toMonth}
      initialMonth={this.state.initialMonth}
      numberOfMonths={1}
      modifiers={{ selected: isSelected, disabled: isDisabled}}
      onDayClick={this._onDayClick}
      locale={ this.props.locale }
      localeUtils={ LocaleUtils }
      captionElement={
          <CaptionElement
            maxDate={maxDate} 
            minDate={minDate} 
            onChange={(initialMonth) => this.setState({initialMonth})} 
            date={this.state.initialMonth} />
      }
          />
    );
  }
});

const CaptionElement = React.createClass({
  propTypes: {
    date: React.PropTypes.object,
    onChange: React.PropTypes.func,
    minDate: React.PropTypes.object, //Moment date
    maxDate: React.PropTypes.object, //Moment date
  },
  _handleChange(e) {
    if (typeof this.props.onChange !== 'function') return;

    let {year, month} = e.target.form;
    year = year.value;
    month = month.value;

    if (year != moment(this.props.date).year()) {
      const tmpDate = moment(this.props.date).year(year);
      const tmpMonths = this._getMonths(tmpDate);
      const currentMonth = tmpMonths[month];

      const allMonths = moment.months();

      if (currentMonth !== allMonths[month]) {
        // The months from allMonths and what will be the result of next iteration doesn't match.
        // This means that we need to adjust the month that we change to.
        // We're gonna find the last matching month, and use that instead.
        // Note that this can only happen on year change.

        const lastTmp = tmpMonths[tmpMonths.length - 1];
        for (let i = allMonths.length; i >= 0; i -= 1) {
          if (allMonths[i] === lastTmp) {
            // We got a match! Set month to this value and break loop.
            month = i;
            break;
          }
        }
      }
    }

    this.props.onChange(new Date(year, month));
  },
  _getMonths(date) {
    const mdate = moment(date);
    let months = moment.months();
    if (this.props.maxDate && this.props.maxDate.year() == mdate.year()) {
      months.splice(
        months.indexOf(this.props.maxDate.format('MMMM')) + 1,
        months.length
      );
    }

    if (this.props.minDate && this.props.minDate.year() == mdate.year()) {
      months.splice(0, months.indexOf(this.props.minDate.format('MMMM')));
    }
    
    return months;
  },
  _getYears() {
    let years = [];
    let y = moment(this.props.minDate);
    while (y.year() <= this.props.maxDate.year()) {
      years.push(y.year());
      y.add(1, 'year');
    }

    return years;
  },
  render() {
    const date = this.props.date;
    const mdate = moment(date);
    const months = this._getMonths(date);
    const years = this._getYears();

    const mMonths = moment.months();
    const mappedMonths = _(months).chain().map((x) => {
      const i = mMonths.indexOf(x);
      return [i, x];
    }).object().value();

    const cap = (x) => x[0].toUpperCase() + x.slice(1);

    return (
      <form className="DayPicker-Caption">
        <select name="month" onChange={ this._handleChange } value={ date.getMonth() }>
          { _(mappedMonths).map((month, i) =>
                      <option key={ i } value={ i }>
                      { cap(month) }
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
