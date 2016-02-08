import React from 'react';

import {Navigation}  from 'bilprospekt-ui';
import {BaseWrapper} from 'bilprospekt-ui';
import {Header}      from 'bilprospekt-ui';
import {Tabs}        from 'bilprospekt-ui';
import {ViewWrapper} from 'bilprospekt-ui';

const AppDoc = React.createClass({
    render() {

        /*
         * Navigation
         */

        const navLinks = [
            ['Instrumentpanel', 'fa-user'],
            ['Prospektera',     'fa-sliders'],
            ['Bearbeta',        'fa-arrows'],
            ['Listor',          'fa-list'],
            ['Analysera',       'fa-line-chart'],
            ['Aktivitet',       'fa-dashboard'],
            ['Inställningar',   'fa-cog']
        ];

        /*
         * Tabs
         */

        const tabLabels = [
            'Allmänt',
            'Konto',
            'Förval',
            'Tid och Datum',
        ];

        return (
            <div>
                <p className="table-header-label">App Example</p>
                <div className='bui-app-base'>
                    <Navigation links={navLinks} searchButton={true} />
                    <BaseWrapper>
                        <Header withTabs={true} pathLabel='Inställningar' />
                        <Tabs labels={tabLabels} />
                    </BaseWrapper>
                </div>

                <pre>
                    <code>
                        {
                            [
                            '<div className="bui-app-base">',
                                <br />,
                                '\t<Navigation links={navLinks} searchButton={true}',
                                <br />,
                                '\t<BaseWrapper>',
                                <br />,
                                '\t\t<Header withTabs={true} pathLabel="Inställningar" />',
                                <br />,
                                '\t\t<Tabs labels={tabLabels} />',
                                <br />,
                                '\t</BaseWrapper>',
                                <br />,
                            '</div>',
                            ]
                        }
                    </code>
                </pre>
            </div>
        );
    },
});

export default AppDoc;