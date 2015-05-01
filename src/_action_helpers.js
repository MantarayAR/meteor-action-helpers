var that = this;

that.__action_helpers = {
  common : {
    add : function ( reference, hookName, callback, priority ) {
      if ( typeof priority === 'undefined' || priority === null ) { 
        priority = 10;
      }
      var newHookName = true;

      // Check if the name exists
      if ( reference[hookName] ) {
        var action  = reference[hookName];
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
        reference[hookName] = {
          actions: [ {
            priority : priority,
            callback : callback
          } ],
          timesExecuted : 0
        };
      }
    },
    has : function ( reference, hookName, callback ) {
     if ( reference[hookName] ) {
        var action = reference[hookName];

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
    },
    remove : function ( reference, hookName, callback, priority ) {
      if ( typeof priority === 'undefined' || priority === null ) { 
        priority = false;
      }

      var removed = false;

      if ( reference[hookName] ) {
        var action = reference[hookName];

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
    },
    removeAll : function ( reference, hookName, priority ) {
      if ( typeof priority === 'undefined' || priority === null ) { 
        priority = false;
      }
      var removed = false;

      if ( reference[hookName] ) {
        var action = reference[hookName];
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
          delete reference[hookName];
          removed = true;
        }
      }

      return removed;
    }
  },
  filterContext : false
}