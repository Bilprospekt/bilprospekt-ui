import React from 'react';
import _ from 'underscore'
import FixedDataTable from 'fixed-data-table';
const {Cell} = FixedDataTable;

const NormalCell = ({data, col, rowIndex, ...props}) => {

    const onMouseEnter = () => {
        if (typeof props.onHover === 'function') {
            props.onHover({col, rowIndex}, true);
        }
    };

    const onMouseLeave = () => {
        if (typeof props.onHover === 'function') {
            props.onHover({col, rowIndex}, false);
        }
    };

    return (
        <Cell
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...props}>
            {data[rowIndex][col]}
        </Cell>
    );
};

export default NormalCell;
