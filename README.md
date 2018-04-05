# bilprospekt-ui
Bilprospekt's UI components

## Setup
```
npm install
```

For watching changes. Run them in seperate windows or however you like.

```
compass watch
webpack --watch
```

# Documentation & Preview
```
cd docs
npm install
npm start
```
Documentation will be available at http://localhost:3210

# Deploying to npm
* Add your user for authentication. Run ```npm adduser``` and follow the instructions.
* Increase version number in package.json
* Run `npm publish`

# Problems with fixed-data-table
```
ERROR in ./~/fixed-data-table/main.js
Module not found: Error: Cannot resolve 'file' or 'directory' ./internal/FixedDataTableRoot in /bilprospekt-ui/node_modules/fixed-data-table
 @ ./~/fixed-data-table/main.js 1:17-57
```

If you see this error you need to install the package manually
```
cd node_modules/fixed-data-table
npm install
npm run build-npm
```