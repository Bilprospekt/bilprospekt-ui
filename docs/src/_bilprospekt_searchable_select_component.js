import React from 'react';
import _ from 'underscore';

import {SearchableSelect} from 'bilprospekt-ui';

const SearchableSelectDoc = React.createClass({
    onSave(a) {
        console.log('save', a);
    },

    getInitialState() {
        return {
            search: '',
        };
    },

    _onChange(value) {
        this.setState({
            search: value,
        });
    },

    render() {
        let searchableSelectData = [
            { label: 'Sölvesborg kommun', id: 'ddi1', value: 'ddv1' },
            { label: 'Number id', id: 13, value: 13},
            { label: 'Älvdalen kommun', id: 'ddi2', value: 'ddv2' },
            { label: 'Alvesta kommun', id: 'ddi3', value: 'ddv3' },
            { label: 'Ludvika kommun', id: 'ddi4', value: 'ddv4' },
            { label: 'Rättvik kommun', id: 'ddi5', value: 'ddv5' },
            { label: 'Vansbro kommun', id: 'ddi6', value: 'ddv6' },
            { label: 'Gävle kommun', id: 'ddi7', value: 'ddv7' },
            { label: 'Hudiksvall kommun', id: 'ddi8', value: 'ddv8' },
            { label: 'Ovanåker kommun', id: 'ddi9',  value: 'ddv9' },
            { label: 'Sandviken kommun', id: 'ddi0', value: 'ddv0' },
            { label: 'Helsingborg kommun', id: 'ddi10', value: 'ddv10' },
        ];

        searchableSelectData = _(searchableSelectData).filter((val) => {
            return val.label.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });

        return (
            <div id='SearchableSelectDoc'>
                <p className="table-header-label">Searchable Select</p>
                <SearchableSelect onChange={this._onChange} icon='fa-search' hint='Sök efter län/kommun' data={searchableSelectData} onSave={this.onSave} />

                <pre>
                <code>
                    {
                        [
                        '<SearchableSelect />',
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default SearchableSelectDoc;
