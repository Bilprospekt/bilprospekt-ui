import _ from 'underscore';

class DataWrapper {

    constructor(data, columns) {
        this.data = data;
        this.columns = columns;
        this.search = null;
        //this.filter = [['a', 'a0'], ['b', 'b1']];
        this.filter = [];
        this.sort = null;
        this.listeners = [];
    }

    _onSearch(val) {
        this.search = val;
        this._emit('search', this.search);
    }

    _onFilter(val) {
        const find = _(this.filter).find((num) => {
            return val[0] === num[0] && val[1] === num[1];
        });

        if (find) {
            this.filter.splice(find, 1);
        } else {
            this.filter.push(val);
        }

        this._emit('filter', this.filter);
    }

    _onSort(columnKey) {
        const reverseOrASC = (dir) => dir === 'ASC' ? 'DESC' : 'ASC'
        this.sort = {
            column: columnKey,
            direction: reverseOrASC((this.sort && this.sort.direction) || ''),
        };
        this._emit('sort', this.sort);
    }

    _onColumnChange(newColumns) {
        this.columns = newColumns;
        this._emit('columns', this.columns);
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

        console.log('filter is', this.filter);
        if (this.filter && this.filter.length) {
            chain = chain.filter((row) => {
                return _(this.filter).filter((filter) => {
                    const column = filter[0];
                    const filterVal = filter[1];
                    return row[column] == filterVal;
                }).length;
            });
        }

        if (this.search) {
            chain = chain.filter((row) => {
                return _(row).filter((cell) => {
                    return cell.indexOf(this.search) !== -1;
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

    getState() {
        return {
            data: this.getData(),
            columns: this.getColumns(),
        };
    }

    //Helper function for desctrucing trigger listeners directly upon Table Component
    triggers() {
        return {
            onSearch: this._onSearch.bind(this),
            onFilter: this._onFilter.bind(this),
            onSort: this._onSort.bind(this),
            onColumnChange: this._onColumnChange.bind(this),
        }
    }
}

export default DataWrapper;
