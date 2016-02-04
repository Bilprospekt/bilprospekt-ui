import React from 'react';

import {Navigation} from 'bilprospekt-ui';

const NavigationDoc = React.createClass({
    render() {
        const navLinks = [
            ['Instrumentpanel', 'fa-user'],
            ['Prospektera',     'fa-sliders'],
            ['Bearbeta',        'fa-arrows'],
            ['Listor',          'fa-list'],
            ['Analysera',       'fa-line-chart'],
            ['Aktivitet',       'fa-dashboard'],
            ['Inställningar',   'fa-cog']
        ];

        return (
            <div>
                <p className="table-header-label">Navigation</p>
                <Navigation links={navLinks} searchButton={true} />

                <pre>
                    <code>
                        {
                            [
                            '<Nav links=[array] searchButton={true} />',
                            ]
                        }
                    </code>
                </pre>
            </div>
        );
    },
});

export default NavigationDoc;