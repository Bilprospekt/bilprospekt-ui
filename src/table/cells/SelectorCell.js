import _ from 'underscore';
import React from 'react';

import {Cell} from 'fixed-data-table';
import Checkbox from '../../checkbox/';

const SelectorCell = ({selections, rowIndex, ...props}) => {
    const onChange = (e, val) => {
        if (typeof props.onChange === 'function') {
            props.onChange(rowIndex, val);
        }
    }

    const checked = _.isArray(selections) ? selections.indexOf(rowIndex) !== -1 : false;

    return (
        <Cell>
            <Checkbox checked={checked} onChange={onChange} />
        </Cell>
    );

};

export default SelectorCell;
