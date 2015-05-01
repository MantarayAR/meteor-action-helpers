var that = this;

that._actions = {
// 'example-action-hook-name' : {
//   actions : [ {
//     priority : 10,
//     callback : function () {}
//   } ],
//   timesExecuted : 0 
// }
};

/**
 * Hooks a function on to a specific action.
 *
 * @param String hookName the name of the action to which the callback is hooked.
 * @param function callback the function that you wish to be hooked.
 * @param Number priority (optional) (default 10) used to specify the order in which the 
 *                        functions associated with a particular action are executed.
 *                        Lower numbers correspond with earlier execution, and functions
 *                        with the same priority are executed in the order in which they
 *                        were added to the action.
 */
that.addAction = function ( hookName, callback, priority ) {
  that.__action_helpers.common.add( that._actions, hookName, callback, priority );
}

/**
 * Check if any action has been registered for a hook
 *
 * @param String hookName The name of the action hook.
 * @param Function callback (optional) if specified, return the priority of that function
 *                          on this hook or false if not attached.
 * @return Number or Boolean
 */
that.hasAction = function ( hookName, callback ) {
  return that.__action_helpers.common.has( that._actions, hookName, callback );
}

/**
 * Execute functions hooked on a specific action hook
 *
 * @param String hookName the name of the hook you wish to execute
 * @param Arguments arg (optional) any number of arguments you to send to this hook.
 */
that.doAction = function ( hookName ) {
  if ( this._actions[hookName] ) {
    var action = that._actions[hookName];

    for ( var j = 0; j < action.actions.length; j++ ) {
      var singleAction = action.actions[j];
      var args         = Array.prototype.slice.call( arguments, 1 );
      singleAction.callback.apply( this, args );
    }

    action.timesExecuted += 1;
  }
};

/**
 * Retrieve the number of times an action is fired
 *
 * @param String hookName The name of the action hook.
 * @return Number The number of times action hookName is fired
 */
that.didAction = function ( hookName ) {
  if ( that._actions[hookName] ) {
    var action = that._actions[hookName];
    
    return action.timesExecuted;
  }

  return false;
}

/**
 * This function removes a function attached to a specified hooked.
 *
 * TODO this function runs noticeably slower than removeAllActions
 *
 * @param String hookName The name of the action hook to which the function to be removed
 *                        is hooked.
 * @param Function callback The function which should be removed.
 * @param Number priority (optional) (default false) the priority number
 *                        to remove the hook from
 * @return Boolean True if the action hookName was successfully removed,
 *                 False otherwise.
 */
that.removeAction = function ( hookName, callback, priority ) {
  return that.__action_helpers.common.remove( that._actions, hookName, callback, priority );
}

/**
 * Remove all of the hooks from an action
 *
 * @param String hookName the name of the action to remove hooks from.
 * @param Number priority (optional) (default false) the priority number
 *                        to remove them from
 * @return Boolean True if the action hookName was successfully removed,
 *                 False otherwise.
 */
that.removeAllActions = function ( hookName, priority ) {
  return that.__action_helpers.common.removeAll( that._actions, hookName, priority );
}
