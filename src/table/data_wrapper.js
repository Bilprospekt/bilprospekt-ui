import _ from 'underscore';

class DataWrapper {

    constructor(data, columns) {
        this.setData(data, true);
        this.setColumns(columns, true);
        this.data = data;
        this.columns = columns;
        this.search = null;
        //this.filter = [['a', 'a0'], ['b', 'b1']];
        this.filter = [];
        this.sort = null;
        this.selections = [];
        this.listeners = [];
    }

    _onSearch(val) {
        this.search = val;
        this._emit('search', this.search);
    }

    _onFilter(values = []) {
        if (_.isArray(values[0]) === false) {
            values = [values];
        }

        _(values).each((val) => {
            const find = _(this.filter).findIndex((num) => {
                return val[0] === num[0] && _.isEqual(val[1], num[1]);
            });

            if (find !== -1) {
                this.filter.splice(find, 1);
            } else {
                this.filter.push(val);
            }
        });

        this._emit('filter', _(this.filter).filter((x) => x[0] !== '_id'));
    }

    _onSort({columnKey, direction}) {
        if (this.sort && this.sort.column === columnKey && this.sort.direction === direction) {
            //Double trigger, turn off sort
            this.sort = null;
        } else {
            this.sort = {
                column: columnKey,
                direction: direction,
            };
        }


        this._emit('sort', this.sort);
    }

    _onColumnChange(newColumns) {
        this.columns = newColumns;
        this._emit('columns', this.columns);
    }

    _onSelection(row, val) {
        if (val) {
            this.selections.push(row);
        } else if(this.selections.indexOf(row) !== -1) {
            this.selections.splice(this.selections.indexOf(row), 1);
        }

        this._emit('selection', {row, val});
    }

    _emit(event, eventData) {
        //Emit data to each listener that listens on triggered event or data.
        if (this.listeners.length > 0) {
            const state = this.getState();
            _(this.listeners).each((val) => {
                if (val[0] === event) {
                    val[1](eventData, state);
                } else if(val[0] === 'change') {
                    val[1](state);
                }
            });
        }
    }

    setData(data, skipEmit = false) {
        this.data = _(data).map((val) => {
            if (typeof val._id === 'undefined') {
                val._id = _.uniqueId('data-wrapper-row_');
            }
            return val;
        });

        if (skipEmit === false) {
            this._emit('data', this.data);
        }
    }

    setColumns(columns, skipEmit = false) {
        this.columns = columns;
        if (skipEmit === false) {
            this._emit('columns', this.columns);
        }
    }

    //Add listener
    on(event, cb) {
        if (typeof cb !== 'function') {
            throw new Error('On only accepts functions as second argument.');
        }

        this.listeners.push(
            [event, cb]
        );
    }

    //Remove listener
    off(event, cb) {
        if (!cb) {
            this.listeners = _(this.listeners).filter((val) => {
                //Remove all values that have event same as given.
                return val[0] != event;
            });
        } else {
            this.listeners = _(this.listeners).filter((val) => {
                //If we find something that matches event and cb, remove it.
                return !(val[0] == event && val[1] == cb);
            });
        }
    }

    //Returns data after applying filter, sort and search.
    getData() {
        var chain =  _(this.data).chain();

        //Only get columns wanted
        chain.map((row) => {
            return _(this.columns).map((column) => {
                return row[column.val] || null;
            });
        });

        if (this.filter && this.filter.length) {

            //We seperate _id filter with rest, since _id filter has precedence.
            const selectionFilter = _(this.filter).filter((val) => val[0] === '_id');
            const restFilter = _(this.filter).difference(selectionFilter);

            if (selectionFilter.length) {
                chain = chain.filter((row) => {
                    return _(selectionFilter).filter((filter) => {
                        return filter[1] === row._id;
                    }).length;
                });
            }

            if (restFilter.length) {
                chain = chain.filter((row) => {
                    return _(restFilter).filter((filter) => {
                        const column = filter[0];
                        const filterVal = filter[1];
                        const val = row[column];
                        if (_.isArray(val)) return val.indexOf(filterVal) !== -1;
                        return val == filterVal;
                    }).length;
                });
            }
        }

        if (this.search) {
            chain = chain.filter((row) => {
                return _(row).filter((cell) => {
                    return cell.toString().toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
                }).length;
            })
        }

        if (this.sort) {
            chain = chain.sortBy(this.sort.column);
            if (this.sort.direction === 'DESC') {
                chain = chain.reverse();
            }
        }

        return chain.value();
    }

    getColumns() {
        //Handle columns here
        return this.columns;
    }

    getColumnFilters() {
      const columns = this.getColumns();
      const data = this.data;
      return _(columns).chain().map((val) => {
        const values = _(data).chain()
                .pluck(val.val)
                //Do a compact, but keep 0
                .filter((x) => x == 0 || x)
                .unique()
                .map((x) => {
                    return {text: x, id: x};
                })
                .value();
        return [val.val, values];
      }).object().value();
    }

    getState() {
        return {
            data: this.getData(),
            columns: this.getColumns(),
            columnFilters: this.getColumnFilters(),
            //Remove _id filters, not needed below this, and makes trouble.
            currentFilters: _(this.filter).filter((x) => x[0] !== '_id'),
            selectedRows: this.selections,

            sort: this.sort,
        };
    }

    //Helper function for desctrucing trigger listeners directly upon Table Component
    triggers() {
        return {
            onSearch: this._onSearch.bind(this),
            onFilter: this._onFilter.bind(this),
            onSort: this._onSort.bind(this),
            onColumnChange: this._onColumnChange.bind(this),
            onSelection: this._onSelection.bind(this),
        }
    }
}

export default DataWrapper;
