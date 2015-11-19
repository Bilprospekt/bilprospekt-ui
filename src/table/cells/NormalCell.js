import React from 'react';
import _ from 'underscore'
import FixedDataTable from 'fixed-data-table';
const {Cell} = FixedDataTable;

const NormalCell = React.createClass({

    propTypes: {
        rowIndex: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.int
        ]).isRequired,
        columnKey: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.int
        ]).isRequired,
        data: React.PropTypes.array.isRequired,
        onHover: React.PropTypes.func,
    },

    shouldComponentUpdate(nextProps, nextState) {
        if (
            (nextProps.columnKey === this.props.columnKey) &&
            (nextProps.rowIndex === this.props.rowIndex) &&
            (nextProps.data[nextProps.rowIndex] === this.props.data[this.props.rowIndex])
        ) return false;
        return true;
    },
    componentWillUpdate() {
        console.time('cellupdate');  
    },
    componentDidUpdate() {
        console.timeEnd('cellupdate');  
    },

    _onMouseEnter() {
        console.log('enter', this.props.rowIndex, this.props.columnKey);
        if (typeof this.props.onHover === 'function') {
            this.props.onHover(this.props, true);
        }
    },

    _onMouseLeave() {
        if (typeof this.props.onHover === 'function') {
            this.props.onHover(this.props, false);
        }
    },

    render() {
        const {rowIndex, columnKey, data, ...props} = this.props;
        const val = data[rowIndex];

        return (
            <Cell
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}
            {...props}>
                {val}
            </Cell>
        );
    },
});

export default NormalCell;
