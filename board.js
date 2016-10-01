var Board = function() {
  that = {};
  that = Object.create(Board.prototype);
  var grid = {};
  var subscribers = [];

  that.subscribe = function(subscriber) {
    subscribers.push(subscriber);
  }

  var publishChanges = function() {
    subscribers.forEach(function(subscriber) { subscriber(); });
  }

  // that.makeLive = function(x, y) {
  //   grid[[x,y]] = true;
  // };

  // that.kill = function(x, y) {
  //   grid[[x,y]] = false;
  // };

  that.makeLive = function(lst) {
    lst.forEach(function(coordinates) { 
      var x = coordinates[0];
      var y = coordinates[1];
      grid[[x,y]] = true });
    publishChanges();
  };

  that.kill = function(lst) {
    lst.forEach(function(coordinates) { 
      var x = coordinates[0];
      var y = coordinates[1];
      grid[[x,y]] = false });
    publishChanges();
  };

  that.getAllAlive = function() {
    return Object.keys(grid).filter(function(key) { return grid[key]===true; }).map(function(pair) {
      var x = pair.split(',')[0];
      var y = pair.split(',')[1];
      return [parseInt(x), parseInt(y)];
    });
  };

  that.getAllDead = function() {
    return Object.keys(grid).filter(function(key) { return grid[key]===false; }).map(function(pair) {
      var x = pair.split(',')[0];
      var y = pair.split(',')[1];
      return [parseInt(x), parseInt(y)];
    });
  };

  that.getNeighbors = function(x, y) {
    var nw = grid[[x-1, y+1]];
    var ne = grid[[x+1, y+1]];
    var sw = grid[[x-1, y-1]];
    var se = grid[[x+1, y-1]];
    var w = grid[[x-1, y]];
    var e = grid[[x+1, y]];
    var n = grid[[x, y+1]];
    var s = grid[[x, y-1]];
    return [w, e, n, s, nw, ne, sw, se].filter(function(neighbor) { return neighbor===true;}).length;
  }
  Object.freeze(that);
  return that;
};