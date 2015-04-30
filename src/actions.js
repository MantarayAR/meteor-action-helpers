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
  if ( typeof priority === 'undefined' || priority === null ) { 
    priority = 10;
  }
  var newHookName = true;

  // Check if the name exists
  if ( that._actions[hookName] ) {
    var action  = that._actions[hookName];
    newHookName = false;
    var hooked  = false;

    // when inserting, insert IN ORDER
    for ( var j = 0; j < action.actions.length; j++ ) {
      var singleAction = action.actions[j];

      if ( singleAction.priority > priority ) {
        // insert BEFORE the current index
        hooked = true;

        action.actions.splice( j, 0, {
          priority : priority,
          callback : callback
        } );
        break;
      }
    }
    // Handle the case where the new priority is bigger than all the rest
    if ( ! hooked ) {
      action.actions.push( {
        priority : priority,
        callback : callback
      } );
    }
  }

  if ( newHookName ) {
    that._actions[hookName] = {
      actions: [ {
        priority : priority,
        callback : callback
      } ],
      timesExecuted : 0
    };
  }
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
  if ( that._actions[hookName] ) {
    var action = that._actions[hookName];

    if ( callback ) {
      for ( var j = action.actions.length - 1; j >= 0; j-- ) {
        var singleAction = action.actions[j];

        if ( singleAction.callback === callback ||
           '' + singleAction.callback === '' + callback ) {
          return singleAction.priority;
        }
      }
    } else {
      return true;
    }
  }

  return false;
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
  if ( typeof priority === 'undefined' || priority === null ) { 
    priority = false;
  }

  var removed = false;

  if ( that._actions[hookName] ) {
    var action = that._actions[hookName];

    for ( var j = action.actions.length - 1; j >= 0; j-- ) {
      var singleAction = action.actions[j];

      if ( priority ) {
        if ( singleAction.priority < priority ) {
          // The actions are sorted in order of priority
          break;
        }

        if ( priority !== singleAction.priority ) {
          continue;
        }
      }

      if ( singleAction.callback === callback ||
           '' + singleAction.callback === '' + callback ) {
        action.actions.splice(j, 1);
        removed = true;
      }
    }
    
  }

  return removed;
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
  if ( typeof priority === 'undefined' || priority === null ) { 
    priority = false;
  }
  var removed = false;

  if ( that._actions[hookName] ) {
    var action = that._actions[hookName];
    if ( priority ) {
      for ( var j = action.actions.length - 1; j >= 0; j-- ) {
        var singleAction = action.actions[j];

        if ( singleAction.priority === priority ) {
          // Delete this current action
          action.actions.splice(j, 1);
          removed = true;
        } else if ( singleAction.priority < priority ) {
          // The actions are sorted in order of priority
          break;
        }
      } 
    } else {
      // Delete all actions
      delete that._actions[hookName];
      removed = true;
    }
  }

  return removed;
}
