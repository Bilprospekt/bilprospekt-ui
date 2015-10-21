import React from 'react';
import {Tooltip} from '../../lib/index.js';

const BilprospektTooltipComponent = React.createClass({

    render() {
        const style = {
            float: 'left',
            marginLeft: 50,
        };
        return (
            <div style={{width: '100%'}}>
                <p className='table-header-label'>Tooltip</p>
                <Tooltip style={style} text="This is a tooltip">
                    Auto orient
                </Tooltip>
                <Tooltip style={style} orient='left' text="This is a tooltip">
                    Left tooltip
                </Tooltip>
                <Tooltip style={style} orient='right' text="This is a tooltip">
                    Right tooltip
                </Tooltip>
                <Tooltip style={style} orient='top' text="This is a tooltip">
                    Top tooltip
                </Tooltip>
                <Tooltip style={style} orient='bottom' text="This is a tooltip">
                    Bottom tooltip
                </Tooltip>
            </div>
        );
    }

});

export default BilprospektTooltipComponent;
