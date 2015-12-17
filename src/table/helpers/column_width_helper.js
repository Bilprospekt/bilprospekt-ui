import _ from 'underscore';

class ColumnWidthHelper {
    constructor(totalWidth = 0, identifiers = []) {
        this.minWidth = 40;
        this.totalWidth = totalWidth;

        //Should be an array with unique identifiers. These needs to be ordered the same way as they are rendered.
        //Otherwise really wierd buggs will appear.
        this.setIdentifiers(identifiers);
        this._setInitWidthForNewIdentifiers();

        this.listeners = [];
    }

    // Number -> Undefined
    setTotalWidth(totalWidth = 0, skipEmit = false) {
        const oldWidth = this.totalWidth;
        this.totalWidth = totalWidth;
        this._scaleCurrentWidths(oldWidth);
        if (!skipEmit) {
            this._emit();
        }
    }

    // Number -> Undefined
    _scaleCurrentWidths(oldWidth) {
        if (!this._columnWidths || !isFinite(oldWidth) || !isFinite(this.totalWidth)) return;
        const scaleValue = (x, in_max, out_max) => {
            return x * out_max / in_max;
        };

        this._columnWidths = _(this._columnWidths).mapObject((x) => {
            return scaleValue(x, oldWidth, this.totalWidth);
        });
    }

    // [String] -> Undefined
    setIdentifiers(newIdentifiers) {
        //We already have identifiers, we need to adjust the ones we have.
    if (this.identifiers && this.identifiers.length && _.difference(newIdentifiers, this.identifiers).length <= 1) {
            let oldWidth;
            if (newIdentifiers.length > this.identifiers.length) {
                //We're adding identifiers
                oldWidth = this.totalWidth + (this.totalWidth / this.identifiers.length);
            } else {
                //We're removing identifiers
                const removedIdentifier = _.difference(this.identifiers, newIdentifiers);
                oldWidth = this.totalWidth - this._columnWidths[removedIdentifier[0]];
            }

            this._scaleCurrentWidths(oldWidth);
            if (newIdentifiers.length > this.identifiers.length) {
                //We're adding identifiers
                const addedIdentifier = _.difference(newIdentifiers, this.identifiers);
                this._columnWidths[addedIdentifier[0]] = (this.totalWidth / newIdentifiers.length);
            }

            this.identifiers = newIdentifiers;
        } else {
            this.identifiers = newIdentifiers;
            this._setInitWidthForNewIdentifiers();
        }
    }

    _setInitWidthForNewIdentifiers() {
        const avgWidth = this.totalWidth / this.identifiers.length;
        this._columnWidths = _(this.identifiers).chain().map((val) => {
            return [val, avgWidth];
        }).object().value();
    }

    // String -> Number -> Undefined
    setWidthForIdentifier(identifier, newWidth) {
        const diff = newWidth - this._columnWidths[identifier];
        const identifierIndex = this.identifiers.indexOf(identifier);
        const nextIdentifier = this.identifiers[identifierIndex + 1];

        let allowedDiff = diff;

        if (!(this._columnWidths[nextIdentifier] >= diff + this.minWidth)) {
            allowedDiff = allowedDiff - (this.minWidth - (this._columnWidths[nextIdentifier] - allowedDiff));
        }

        //Change next column with reverse of current columns change.
        this._columnWidths[nextIdentifier] -= allowedDiff;

        //Change given column
        this._columnWidths[identifier] += allowedDiff;
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
        this._setInitWidthForNewIdentifiers();
        this._emit();
    }

    // {String: {width: Number, minWidth: Number, maxWidth: Number}}
    _getWidths() {
        return _(this._columnWidths).mapObject((width, key) => {
            const identifierIndex = this.identifiers.indexOf(key);
            const nextIdentifier = this.identifiers[identifierIndex + 1];
            const maxWidth = width + this._columnWidths[nextIdentifier] - 40;
            return {
                width: width,
                minWidth: this.minWidth,
                maxWidth: maxWidth,
            };
        });
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
