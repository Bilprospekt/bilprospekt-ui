import React from 'react';

import {Tabs} from 'bilprospekt-ui';

const TabsDoc = React.createClass({
    getInitialState() {
        return {
            index: 0,
        }
    },

    _onChange(index) {
        this.setState({ index });
    },

    render() {
        const tabLabels = [
            'Allmänt',
            'Konto',
            'Förval',
            'Tid och Datum',
        ];

        return (
            <div id='TabsDoc'>
                <p className="table-header-label">Tabs</p>
                <Tabs labels={tabLabels} selectedTab={0} onChange={this._onChange}>
                    <p>Tab {this.state.index} Content</p>
                </ Tabs>
            </div>
        );
    },
});

export default TabsDoc;