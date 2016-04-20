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

    _updateSelectedTab(index) {
        this.setState({ index: index });
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

                <p onClick={this._updateSelectedTab.bind(this, 0)}>Allmänt</p>
                <p onClick={this._updateSelectedTab.bind(this, 1)}>Konto</p>
                <p onClick={this._updateSelectedTab.bind(this, 2)}>Förval</p>
                <p onClick={this._updateSelectedTab.bind(this, 3)}>Tid och Datum</p>

                <Tabs labels={tabLabels} selectedTab={this.state.index} onChange={this._onChange}>
                    <p>Tab {this.state.index} Content</p>
                </ Tabs>

                <pre>
                <code>
                    {
                        [
                        '<Tabs labels=[array] selectedTab={number}>',
                        '\n\t {this.props.children}',
                        '\n</Tabs>'
                        ]
                    }
                </code>
                </pre>
            </div>
        );
    },
});

export default TabsDoc;