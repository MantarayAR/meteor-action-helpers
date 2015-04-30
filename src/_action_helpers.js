var that = this;

that.__action_helpers = {
  common : {
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
  }
}