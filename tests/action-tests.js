var that = this;

Tinytest.add( 'actions is an object', function ( test ) {
  // Sanity check to start
  test.equal( true, true );
  test.equal( typeof that._actions, 'object' );
} );

Tinytest.add( 'addAction will add in order', function ( test ) {
  var func = function () { return 'wow' };
  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {}
      },{
        priority : 20,
        callback : function () {}
      } ],
      timesExecuted : 0
    }
  };


  // Test generic case (insert 15 into [10, 20])
  that.addAction( 'example-action-hook-name', func, 15 );
  test.equal( that._actions['example-action-hook-name'].actions[1].callback + '', func + '' );

  // // Test edge case (insert 0 into [10, 15, 20])
  that.addAction( 'example-action-hook-name', func, 0 );
  test.equal( that._actions['example-action-hook-name'].actions[0].callback + '', func + '' );

  // // Test edge case (insert 30 into [10, 20])
  that.addAction( 'example-action-hook-name', func, 30 );
  test.equal( that._actions['example-action-hook-name'].actions[4].callback + '', func + '' );

} );

Tinytest.add( 'addAction will add if new hook name', function ( test ) {
  that._actions = {};
  // Test inserting a new action
  that.addAction( 'hook', function () {} );

  test.equal( that.hasAction( 'hook' ), true );
  test.notEqual( that._actions.hook, null );
  test.equal( that._actions.hook.actions.length, 1 );
} );


Tinytest.add( 'hasAction will check that a hook exists', function ( test ) {
  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {}
      } ],
      timesExecuted : 0
    }
  };

  var result = that.hasAction( 'example-action-hook-name' );
  test.equal( result, true );

  result = that.hasAction( 'non-existent-action' );
  test.equal( result, false );
} );

Tinytest.add( 'hasAction will check that a hook exists with a callback', function ( test ) {
  var func = function () {};
  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : func
      } ],
      timesExecuted : 0
    }
  };

  var result = that.hasAction( 'example-action-hook-name', func );
  test.equal( result, 10 );

  result = that.hasAction( 'non-existent-action', func );
  test.equal( result, false );
} );

Tinytest.add( 'doAction will perform the actions attached to the hook', function ( test ) {
  var a = 0;
  var b = 0;

  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {
          a = 10;
        }
      }, {
        priority : 12,
        callback : function () {
          b = 20;
        }
      } ],
      timesExecuted : 0
    }
  };

  that.doAction( 'example-action-hook-name' );

  test.equal( a, 10 );
  test.equal( b, 20 );
  test.equal( that._actions['example-action-hook-name'].timesExecuted, 1 );
} );

Tinytest.add( 'doAction will pass arguments along', function ( test ) {
  var a = false;

  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {
          a = Array.prototype.slice.call( arguments, 0);
        }
      } ],
      timesExecuted : 0
    }
  };

  that.doAction( 'example-action-hook-name', 'wow', 'doge' );

  test.equal( a, ['wow', 'doge'] );
  test.equal( that._actions['example-action-hook-name'].timesExecuted, 1 );
} );

Tinytest.add( 'didAction counts how many times a hook was called', function ( test ) {
  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {}
      } ],
      timesExecuted : 20
    }
  };

  var result = that.didAction( 'example-action-hook-name' );
  test.equal( result, 20 );

  result = that.didAction( 'non-existent-action' );
  test.equal( result, false );
} );

Tinytest.add( 'didAction counts how many times a hook was called (integration)', function ( test ) {
  that._actions = {};
  that.addAction( 'example-action-hook-name', function () {} );

  that.doAction( 'example-action-hook-name' );
  that.doAction( 'example-action-hook-name' );
  that.doAction( 'example-action-hook-name' );

  var result = that.didAction( 'example-action-hook-name' );
  test.equal( result, 3 );

  result = that.didAction( 'non-existent-action' );
  test.equal( result, false );
} );

Tinytest.add( 'removeAction removes the given hook', function ( test ) {
  var func = function () {
    return 'wow';
  };

  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : func
      },
      {
        priority : 12,
        callback : function () {}
      } ]
    }
  };

  var result = that.removeAction( 'example-action-hook-name', func );

  test.notEqual( that._actions['example-action-hook-name'], null );
  test.equal( that._actions['example-action-hook-name'].actions.length, 1 );
  test.equal( that._actions['example-action-hook-name'].actions[0].callback + '', 'function () {}' );
  test.equal( result, true );
} );

Tinytest.add( 'removeAction removes the given hook with a priority', function ( test ) {
  var func = function () {
    return 'wow';
  };

  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : func
      },
      {
        priority : 12,
        callback : func
      } ]
    }
  };

  var result = that.removeAction( 'example-action-hook-name', func, 12 );

  test.notEqual( that._actions['example-action-hook-name'], null );
  test.equal( that._actions['example-action-hook-name'].actions.length, 1 );
  test.equal( result, true );
} );

Tinytest.add( 'removeAllActions removes all of the given hook', function ( test ) {
  that._actions = {
    'example-action-hook-name' : { 
      actions : [ {
        priority : 10,
        callback : function () {}
      },
      {
        priority : 12,
        callback : function () {}
      } ]
    }
  };

  var result = that.removeAllActions( 'example-action-hook-name' );

  test.equal( that._actions['example-action-hook-name'], undefined );
  test.equal( result, true );
} );

Tinytest.add( 'removeAllActions removes all of the given hook with a given priority', function ( test ) {
  that._actions = {
    'example-action-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {}
      },
      {
        priority : 12,
        callback : function () {}
      } ]
    }
  };

  var result = that.removeAllActions( 'example-action-hook-name', 12 );

  test.notEqual( that._actions['example-action-hook-name'], null );
  test.equal( that._actions['example-action-hook-name'].actions.length, 1 );
  test.equal( result, true );
} );

