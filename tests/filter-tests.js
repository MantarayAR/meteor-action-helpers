var that = this;

Tinytest.add( 'filter is an object', function ( test ) {
  // Sanity check to start
  test.equal( true, true );
  test.equal( typeof that._filters, 'object' );
} );

Tinytest.add( 'addFilter will add in order', function ( test ) {
  var func = function () { return 'wow' };
  that._filters = {
    'example-filter-hook-name' : {
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
  that.addFilter( 'example-filter-hook-name', func, 15 );
  test.equal( that._filters['example-filter-hook-name'].actions[1].callback + '', func + '' );

  // // Test edge case (insert 0 into [10, 15, 20])
  that.addFilter( 'example-filter-hook-name', func, 0 );
  test.equal( that._filters['example-filter-hook-name'].actions[0].callback + '', func + '' );

  // // Test edge case (insert 30 into [10, 20])
  that.addFilter( 'example-filter-hook-name', func, 30 );
  test.equal( that._filters['example-filter-hook-name'].actions[4].callback + '', func + '' );

} );

Tinytest.add( 'addFilter will add if new hook name', function ( test ) {
  that._filters = {};
  // Test inserting a new action
  that.addFilter( 'hook', function () {} );

  test.equal( that.hasFilter( 'hook' ), true );
  test.notEqual( that._filters.hook, null );
  test.equal( that._filters.hook.actions.length, 1 );
} );

Tinytest.add( 'hasFilter will check that a hook exists', function ( test ) {
  that._filters = {
    'example-filter-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {}
      } ],
      timesExecuted : 0
    }
  };

  var result = that.hasFilter( 'example-filter-hook-name' );
  test.equal( result, true );

  result = that.hasFilter( 'non-existent-filter' );
  test.equal( result, false );
} );

Tinytest.add( 'hasFilter will check that a hook exists with a callback', function ( test ) {
  var func = function () {};
  that._filters = {
    'example-filter-hook-name' : {
      actions : [ {
        priority : 10,
        callback : func
      } ],
      timesExecuted : 0
    }
  };

  var result = that.hasFilter( 'example-filter-hook-name', func );
  test.equal( result, 10 );

  result = that.hasFilter( 'non-existent-filter', func );
  test.equal( result, false );
} );

Tinytest.add( 'applyFilters will run one filter', function ( test ) {
  that._filters = {
    'wow' : {
      actions : [ {
        priority : 10,
        callback : function () {
          return 1;
        }
      }]
    }
  };

  var result = that.applyFilters( 'wow' );

  test.equal( result, 1 );
} );

Tinytest.add( 'applyFilters will run multiple filters', function ( test ) {
  that._filters = {
    'wow' : {
      actions : [ {
        priority : 10,
        callback : function () {
          return 1;
        }
      }, {
        priority : 12,
        callback : function () {
          return 2;
        }
      } ]
    }
  };

  var result = that.applyFilters( 'wow' );

  test.equal( result, 2 );
} );

Tinytest.add( 'applyFilters will accept data', function ( test ) {
  that._filters = {
    'wow' : {
      actions : [ {
        priority : 10,
        callback : function ( input ) {
          return input + ' doge';
        }
      }]
    }
  };

  var result = that.applyFilters( 'wow', 'good' );

  test.equal( result, 'good doge' );
} );

Tinytest.add( 'applyFilters will chain data', function ( test ) {
  var a = false;

  that._filters = {
    'wow' : {
      actions : [ {
        priority : 10,
        callback : function ( input ) {
          return input + 'good ';
        }
      }, {
        priority : 12,
        callback : function ( input ) {
          return input + 'doge';
        }
      } ]
    }
  };

  var result = that.applyFilters( 'wow', '' );

  test.equal( result, 'good doge' );
} );

Tinytest.add( 'currentFilter is the name of the filter', function ( test ) {
  var a = false;

  that._filters = {
    'wow' : {
      actions : [ {
        priority : 10,
        callback : function () {
          a = that.currentFilter();
        }
      }]
    }
  };

  that.applyFilters( 'wow' );

  test.equal( a, 'wow' );
} );

Tinytest.add( 'currentFilter is false if called outside of a filter', function ( test ) {
  that._filters = {};

  that.applyFilters( 'non-existant' );
  var result = that.currentFilter();

  test.equal( result, false );
} );

Tinytest.add( 'removeFilter removes the given hook', function ( test ) {
  var func = function () {
    return 'wow';
  }

  that._filters = {
    'example-filter-hook-name' : {
      actions : [ {
        priority : 10,
        callback : func
      }, {
        priority : 12,
        callback : function () {}
      }]
    }
  }

  var result = that.removeFilter( 'example-filter-hook-name', func );

  test.notEqual( that._filters['example-filter-hook-name'], null );
  test.equal( that._filters['example-filter-hook-name'].actions.length, 1 );
  test.equal( that._filters['example-filter-hook-name'].actions[0].callback + '', 'function () {}' );
  test.equal( result, true );
} );

Tinytest.add( 'removeFilter removes the given hook with a priority', function ( test ) {
  var func = function () {
    return 'wow';
  }

  that._filters = {
    'example-filter-hook-name' : {
      actions : [ {
        priority : 10,
        callback : func
      }, {
        priority : 12,
        callback : func
      } ]
    }
  }

  var result = that.removeFilter( 'example-filter-hook-name', func, 12 );

  test.notEqual( that._filters['example-filter-hook-name'], undefined );
  test.equal( that._filters['example-filter-hook-name'].actions.length, 1 );
  test.equal( result, true );
} );

Tinytest.add( 'removeAllFilters removes all of the given hook', function ( test ) {
  that._filters = {
    'example-filter-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {}
      }, {
        priority : 12,
        callback : function () {}
      } ]
    }
  }

  var result = that.removeAllFilters( 'example-filter-hook-name' );

  test.equal( that._filters['example-filter-hook-name'], undefined );
  test.equal( result, true );
} );

Tinytest.add( 'removeAllFilters removes all of the given hook with the given priority', function ( test ) {
  that._filters = {
    'example-filter-hook-name' : {
      actions : [ {
        priority : 10,
        callback : function () {}
      }, {
        priority : 12,
        callback : function () {}
      } ]
    }
  }

  var result = that.removeAllFilters( 'example-filter-hook-name', 12 );

  test.notEqual( that._filters['example-filter-hook-name'], undefined );
  test.equal( that._filters['example-filter-hook-name'].actions.length, 1 );
  test.equal( result, true );
} );