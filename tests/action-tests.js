var that = this;

Tinytest.add( 'doAction will perform the actions attached to the hook', function ( test ) {
  var a = 0;
  var b = 0;

  that._actions = [ {
    hookName : 'example-action-hook-name',
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
  } ];

  that.doAction( 'example-action-hook-name' );

  test.equal( a, 10 );
  test.equal( b, 20 );
  test.equal( that._actions[0].timesExecuted, 1 );
} );

Tinytest.add( 'doAction will pass arguments along', function ( test ) {
  var a = false;

  that._actions = [ {
    hookName : 'example-action-hook-name',
    actions : [ {
      priority : 10,
      callback : function () {
        a = Array.prototype.slice.call( arguments, 0);
      }
    } ],
    timesExecuted : 0
  } ];

  that.doAction( 'example-action-hook-name', 'wow', 'doge' );

  test.equal( a, ['wow', 'doge'] );
  test.equal( that._actions[0].timesExecuted, 1 );
} );

Tinytest.add( 'didAction counts how many times a hook was called', function ( test ) {
  that._actions = [ {
    hookName : 'example-action-hook-name',
    actions : [ {
      priority : 10,
      callback : function () {}
    } ],
    timesExecuted : 20
  } ];

  var result = that.didAction( 'example-action-hook-name' );
  test.equal( result, 20 );

  result = that.didAction( 'non-existant-action' );
  test.equal( result, false );
} );

Tinytest.add( 'didAction counts how many times a hook was called (integration)', function ( test ) {
  that._actions = [];
  that.addAction( 'example-action-hook-name', function () {} );

  that.doAction( 'example-action-hook-name' );
  that.doAction( 'example-action-hook-name' );
  that.doAction( 'example-action-hook-name' );

  var result = that.didAction( 'example-action-hook-name' );
  test.equal( result, 3 );

  result = that.didAction( 'non-existant-action' );
  test.equal( result, false );
} );

Tinytest.add( 'removeAction removes the given hook', function ( test ) {
  var func = function () {
    return 'wow';
  };

  that._actions = [ {
    hookName : 'example-action-hook-name',
    actions : [ {
      priority : 10,
      callback : func
    },
    {
      priority : 12,
      callback : function () {}
    } ]
  } ];

  var result = that.removeAction( 'example-action-hook-name', func );

  test.equal( that._actions.length, 1 );
  test.equal( that._actions[0].actions.length, 1 );
  test.equal( that._actions[0].actions[0].callback + '', 'function () {}' );
  test.equal( result, true );
} );

Tinytest.add( 'removeAction removes the given hook with a priority', function ( test ) {
  var func = function () {
    return 'wow';
  };

  that._actions = [ {
    hookName : 'example-action-hook-name',
    actions : [ {
      priority : 10,
      callback : func
    },
    {
      priority : 12,
      callback : func
    } ]
  } ];

  var result = that.removeAction( 'example-action-hook-name', func, 12 );

  test.equal( that._actions.length, 1 );
  test.equal( that._actions[0].actions.length, 1 );
  test.equal( result, true );
} );

Tinytest.add( 'removeAllActions removes all of the given hook', function ( test ) {
  that._actions = [ {
    hookName : 'example-action-hook-name',
    actions : [ {
      priority : 10,
      callback : function () {}
    },
    {
      priority : 12,
      callback : function () {}
    } ]
  } ];

  var result = that.removeAllActions( 'example-action-hook-name' );

  test.equal( that._actions.length, 0 );
  test.equal( result, true );
} );

Tinytest.add( 'removeAllActions removes all of the given hook with a given priority', function ( test ) {
  that._actions = [ {
    hookName : 'example-action-hook-name',
    actions : [ {
      priority : 10,
      callback : function () {}
    },
    {
      priority : 12,
      callback : function () {}
    } ]
  } ];

  var result = that.removeAllActions( 'example-action-hook-name', 12 );

  test.equal( that._actions.length, 1 );
  test.equal( that._actions[0].actions.length, 1 );
  test.equal( result, true );
} );