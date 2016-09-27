import React from 'react';
import _ from 'underscore';

import {SearchableSelect, Chips} from 'bilprospekt-ui';

const SearchableSelectDoc = React.createClass({
    onSave(objects) {
      this.setState({selected: objects});
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

    _onRemove(id) {
      let selected = JSON.parse(JSON.stringify(this.state.selected));
      let updatedSelected = _(selected).chain().map((o) => {
        return o.id === id ? null : o;
      }).compact().value();

      this.setState({selected: updatedSelected});
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

        let selected = _(this.state.selected).map((selected, index) => {
          return <Chips key={index} {...selected} onRemoveClick={this._onRemove}/>
        });

        return (
            <div id='SearchableSelectDoc'>
                <p className="table-header-label">Searchable Select</p>

                <SearchableSelect style={{margin: 10}} fieldWidth={250} onChange={this._onChange} icon='fa-search' hint='Sök efter län/kommun' data={searchableSelectData} onSave={this.onSave} checked={this.state.selected} />

                {selected}
                <pre>
                <code>
                    {
                        [
                        '<SearchableSelect',
                        '\n\t data=[array]',
                        '\n\t icon="string"',
                        '\n\t hint="string"',
                        '\n\t fieldWidth={number}',
                        '\n\t onSaveLabel="string"',
                        '\n\t onSave={function}',
                        '\n\t onChange={function}',
                        '\n/>'
                        ]
                    }
                </code>
                </pre>

            </div>
        );
    },
});

export default SearchableSelectDoc;
