import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import TableFilterPopupComponent from '../table_filter_popup_component.js';
import FixedDataTable from 'fixed-data-table';
const {Cell} = FixedDataTable;
import $ from 'jquery'

const HeaderCell = React.createClass({
    propTypes: {
        val: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onSort: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        availableFilters: React.PropTypes.array,
        currentFilters: React.PropTypes.array,

        //Current sort values
        sort: React.PropTypes.shape({
            direction: React.PropTypes.string,
        }),
    },
    getInitialState() {
        return {
            hover: false,
            filterIsOpen: false,
        };
    },
    _onMouseEnter() {
        this.setState({
            hover: true,
        });
    },
    _onMouseLeave() {
        if (this.state.filterOpen) return;
        this.setState({
            hover: false,
        });
    },
    _onFilter(val) {
        if (typeof this.props.onFilter === 'function') {
            this.props.onFilter([[this.props.val, val]]);
        }
    },
    _onFilterToggle(val) {
        let hover = this.state.hover;
        if (!val && this.state.hover) hover = false;
        this.setState({
            filterOpen: val,
            hover,
        });
    },
    _showFilterPopup(e) {
        const {
            currentFilters,
            availableFilters,
        } = this.props;

        if (!availableFilters) return;

        let pos = $(e.target).offset();
        let tablePos = $(e.target).parents('.bui-table-holder').offset();
        const props = {
            availableFilters,
            currentFilters,
            onFilter: this._onFilter,
            onSort: this.props.onSort,
            sort: this.props.sort,
            top: 110,
            left: pos.left - tablePos.left,
            val: this.props.val,
            columnLabel: this.props.label,
            unmount: () => {
                const el = document.getElementById('bui-table-popup-holder');
                if (el) {
                    ReactDOM.unmountComponentAtNode(el);
                }
            },
        };

        ReactDOM.render(
            <TableFilterPopupComponent {...props} />,
            document.getElementById('bui-table-popup-holder')
        );
        e.preventDefault();
        e.stopPropagation();
    },
    render() {
        let filterIcon = null;
        if (this.state.hover && this.props.availableFilters) {
            filterIcon = (
                <i className='fa fa-caret-down cellcontent_headerLabel_dropdownIcon' onClick={this._showFilterPopup} />
            );
        }

        let sortIndicator = null;
        const sortIndicatorStyle = ({
            fontSize: 13,
            color: '#00BCD4',
            marginLeft: 10,
        });
        if (this.props.sort) {
            sortIndicator = (this.props.sort.direction === 'ASC') ? 'fa-arrow-up' : 'fa-arrow-down';
            sortIndicator = <i style={sortIndicatorStyle} className={"fa " + sortIndicator} />;
        }

        return (
            <Cell
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}>
                    {sortIndicator}
                    <span className='cellcontent_headerLabel'>{this.props.label}</span>
                    {filterIcon}
            </Cell>
        )
    }
});

export default HeaderCell;
