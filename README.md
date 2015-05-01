# meteor-action-helpers
Use Wordpress style actions and filters in Meteor.

# Actions

See `./src/actions.js` for detailed documentation.

```js
addAction( hookName, callback, [priority=10] );
hasAction( hookName, [callback] ) : Boolean|Number;
doAction( hookName );
didAction( hookName ) : Number;
removeAction( hookName, callback, [priority] ) : Boolean;
removeAllActions( hookName, [priority] ) : Boolean;
```

# Filters

See `./src/filters.js` for detailed documentation.

```js
addFilter( hookName, callback, [priority=10] );
hasFilter( hookName, [callback] ) : Boolean|Number;
applyFilters( hookName ) : Any;
currentFilter() : String;
removeFilter( hookname, callback, [priority] ) : Boolean;
removeAllFilters( hookName, [priority] ) : Boolean;
```

# Tests

You can run the tests by doing:

```cmd
cd meteor
meteor test-packages ./
```