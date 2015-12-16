import _ from 'underscore';

class ColumnWidthHelper {
    constructor(totalWidth = 0, identifiers = []) {
        this.setTotalWidth(totalWidth, true);

        //Should be an array with unique identifiers
        this.setIdentifiers(identifiers);

        this.precedences = [];
        this.listeners = [];
    }

    // Number -> Undefined
    setTotalWidth(totalWidth = 0, skipEmit = false) {
        this.totalWidth = totalWidth;
        if (!skipEmit) {
            this._emit();
        }
    }

    // [String] -> Undefined
    setIdentifiers(identifiers) {
        this.identifiers = identifiers;
    }

    // String -> Number -> Undefined
    setWidthForIdentifier(identifier, width) {
        this._emit();
    }

    // {columnWidths: {String: Number}, totalWidth: Number}
    getState() {
        return {
            columnWidths: this._getWidths(),
            totalWidth: this.totalWidth,
        }
    }

    // Undefined
    justifyColumns() {
        this.precedences = [];
    }

    // {String: Number}
    _getWidths() {
        const avgWidth = this.totalWidth / this.identifiers.length;
        return _(this.identifiers).chain().map((val) => {
            return [val, avgWidth];
        }).object().value();
    }

    _emit() {
        if (this.listeners.length) {
            _(this.listeners).each((fn) => fn());
        }
    }

    onChange(cb) {
        this.listeners.push(cb);
    }

    destroyListeners() {
        this.listeners = [];
    }

};

export default ColumnWidthHelper;
