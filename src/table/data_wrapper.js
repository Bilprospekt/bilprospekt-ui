import _ from 'underscore';
import {EventEmitter2} from 'eventemitter2';

class DataWrapper extends EventEmitter2 {

  constructor(data, columns) {
    super();
    this.setData(data, true);
    this.setColumns(columns, true);
    this.listeners = [];

    this.clear();
  }

  clear() {
    this.search = null;
    this.filter = [];
    this.sort = null;
    this.selections = [];
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

    this._emit('filter', this.filter);
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
      //Check so we don't add it twice.
      if (this.selections.indexOf(row) === -1) {
        this.selections.push(row);
      }
    } else if(this.selections.indexOf(row) !== -1) {
      this.selections.splice(this.selections.indexOf(row), 1);
    }

    this._emit('selection', {row, val});
  }

  _emit(event, eventData) {
    const state = this.getState();
    this.emit('change', state); //Currently we always want to emot change here for legacy reasons.
    if (event !== 'change') { //To avoid duplicate change emit
      this.emit(event, eventData, state);
    }
  }

  _formatData(data) {
    return _(data).map((val) => {
      if (typeof val._id === 'undefined') {
        val._id = _.uniqueId('data-wrapper-row_');
      }
      return val;
    });
  }

  setData(data, skipEmit = false) {
    this.data = this._formatData(data);

    if (skipEmit === false) {
      this._emit('data', this.data);
    }
  }

  addData(data, skipEmit = false) {
    this.data = this.getRawData().concat(this._formatData(data));

    if (skipEmit === false) {
      this._emit('data', this.data);
    }
  }

  getRawData() {
    return this.data || [];
  }

  setColumns(columns, skipEmit = false) {
    this.columns = columns;
    if (skipEmit === false) {
      this._emit('columns', this.columns);
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
          if (!cell) return false;
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
      currentFilters: this.filter.slice(),
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
