import React from 'react';

import {Navigation, BaseWrapper, Header, Tabs}  from 'bilprospekt-ui';

const AppDoc = React.createClass({
    getInitialState() {
        return {
            smallNav: false,
            activeNavLink: 0,
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

    _onNavLinkChange(link) {
        this.setState({ activeNavLink: link });
    },

    render() {

        /*
         * Navigation
         */

        const navLinks = [
            {link: 'dashboard', label: 'Instrumentpanel', icon: 'fa-user'},
            {link: 'prospect', label: 'Prospektera', icon: 'fa-sliders'},
            {link: 'agile', label: 'Bearbeta', icon: 'fa-arrows'},
            {link: 'list', label: 'Listor', icon: 'fa-list'},
            {link: 'analyse', label: 'Analysera', icon: 'fa-line-chart'},
            {link: 'activity', label: 'Aktivitet', icon: 'fa-dashboard'},
            {link: 'settings', label: 'Inställningar', icon: 'fa-cog'}
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

        const searchData = [
            {type: 'company', name: 'Planet express', id: 0},
            {type: 'car', name: 'ABC123', id: 1},
            {type: 'person', name: 'Bender', id: 'bend'},
            {type: 'person', name: 'Planet Express, Planet Express, Planet Express, Planet Express, Planet Express'},
            {type: 'company', name: 'MomCorp', id: 'MOM'},
            {type: 'person', name: 'Hubert Farnsworth', id: 'hubert'},
        ];

        return (
            <div id='AppDoc'>
                <p className="table-header-label">App Example</p>
                <div className='bui-app-base'>
                    <Navigation searchData={searchData} logos={logos} links={navLinks} activeLink={this.state.activeNavLink} onNavClick={this._onNavLinkChange} searchButton={true} onClick={this._toggleMenuSize} />
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
                                '\t<Navigation searchData={searchData} logos={object} links={navLinks} activeLink={number} onChange={function} searchButton={true} onClick={function} />',
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
