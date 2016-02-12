import React from 'react';

import {Navigation}  from 'bilprospekt-ui';
import {BaseWrapper} from 'bilprospekt-ui';
import {Header}      from 'bilprospekt-ui';
import {Tabs}        from 'bilprospekt-ui';
import {ViewWrapper} from 'bilprospekt-ui';

const AppDoc = React.createClass({
    getInitialState() {
        return {
            smallNav: false,
        };
    },

    _toggleMenuSize(bool) {
        this.setState({ smallNav: bool });

        if (document.createEvent) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
        } else { //IE
            var element = document.documentElement;
            var event = document.createEventObject();
            element.fireEvent('onresize', event);
        }
    },

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

        /*
         * Base Wrapper
         */

        const logos = {
            small: <img src='img/bilprospekt_logo_small.png' />,
            big: <img src='img/bilprospekt_logo_big.png' />,
        };

        return (
            <div>
                <p className="table-header-label">App Example</p>
                <div className='bui-app-base'>
                    <Navigation logos={logos} links={navLinks} searchButton={true} onClick={this._toggleMenuSize} />
                    <BaseWrapper bigView={this.state.smallNav}>
                        <Header withTabs={true} withSearch={true} pathLabel='Inställningar' />
                        <Tabs labels={tabLabels} />
                    </BaseWrapper>
                </div>

                <pre>
                    <code>
                        {
                            [
                            '<div className="bui-app-base">',
                                <br />,
                                '\t<Navigation links={navLinks} searchButton={true} />',
                                <br />,
                                '\t<BaseWrapper bigView={bool}>',
                                <br />,
                                '\t\t<Header withTabs={true} withSearch={true} pathLabel="Inställningar" />',
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
