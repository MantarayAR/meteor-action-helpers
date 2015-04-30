var that = this;

that._filters = {
  'example-filter-hook-name' : {
    actions : [
    ],
    timeExecuted : 0
  }
};


/**
 * Hook a function to a specific filter action
 *
 * @param String hookName the name of the filter to hook the callback to.
 * @param Function callback the function to be called when the custom filter is applied.
 * @param Number priority (optional) (default 10) Used to specify the order in which
 *                        the functions associated with a particular action are executed.
 *                        Lower numbers correspond with earlier execution, the functions
 *                        with the same priority are executed in the order in which they
 *                        were added to the filter.
 * @return Boolean the function returns trueof the attempted function hook succeeds
 */
that.addFilter = function( hookName, callback, priority ) {
  if ( typeof priority === 'undefined' || priority === null ) { 
    priority = 10;
  }
  // TODO
}

/**
 * Check if any filter has been registers for a hook
 *
 * @param String hookName the name of the filter hook.
 * @param Function callback (optional) if specified, return the priority of that function
 *                          on this hook.  Returns false otherwise.
 * @return Boolean or Number
 */
that.hasFilter = function ( hookName, callback ) {
  callback = callback || false;
  // TODO
}


/**
 * Call the functions added to a filter hook.  The callback functions
 * attached to filter hookName are invoked by calling this function. This function can be
 * used to create a new filter hook by simply calling this function with the name of the
 * name of the new hook specified using the hookName parameter.
 *
 * @param String hookName the name of the filter hook
 * @param Any arguments Zero or many variables to pass to the filter function
 * @return Any
 */
that.applyFilters = function ( hookName ) {
  // TODO
}

/**
 * Retrieve the name of the current filter
 *
 * @return String
 */
that.currentFilter = function () {
  // TODO
}

/**
 * This function removes a function attached to a specified filter hook.
 *
 * @param String hookName the filter hook to which the function to be removed is hooked.
 * @param Function callback the callback for the function which should be removed
 * @param Number priority (default) The priority of the function
 */
that.removeFilter = function ( hookName, callback, priority ) {
  // TODO
}

/**
 * Remove all of the hooks from a filter
 *
 * @param String hookName the filter ro remove hooks from.
 * @param Number priority the priority number to remove
 * @return Boolean True if the filter hookName was successfully removed,
 *                 False otherwise.
 */
that.removeAllFilters = function ( hookName, priority ) {
  return that.__action_helpers.common.removeAll( that._filters, hookName, priority );
}

