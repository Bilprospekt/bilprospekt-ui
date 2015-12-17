import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import TableFilterPopupComponent from '../table_filter_popup_component.js';
import FixedDataTable from 'fixed-data-table';
const {Cell} = FixedDataTable;

const HeaderCell = React.createClass({
    propTypes: {
        val: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onSort: React.PropTypes.func,
        onFilter: React.PropTypes.func,
        availableFilters: React.PropTypes.array,
        currentFilters: React.PropTypes.array,
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
            this.props.onFilter([this.props.val, val]);
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
        const relative = this.props.relativeScrollingEl ? this.props.relativeScrollingEl : window;
        pos.top += $(relative).scrollTop();
        const props = {
            availableFilters,
            currentFilters,
            onFilter: this._onFilter,
            top: pos.top,
            left: pos.left,
            val: this.props.val,
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

        return (
            <Cell
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
                onClick={this.props.onSort}>
                    <span className='cellcontent_headerLabel'>{this.props.label}</span>
                    {filterIcon}
            </Cell>
        )
    }
});

export default HeaderCell;
