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
      grid[[x,y]] = true;
    });
    publishChanges();
  };

  that.kill = function(lst) {
    lst.forEach(function(coordinates) { 
      var x = coordinates[0];
      var y = coordinates[1];
      delete grid[[x,y]];
    });
    publishChanges();
  };

  that.getAllAlive = function() {
    var result = Object.keys(grid).map(function(pair) {
      var x = pair.split(',')[0];
      var y = pair.split(',')[1];
      return [parseInt(x), parseInt(y)];
    });
    return result;
  };

  that.getNeighborIndices = function(x, y) {
    var neighbors = [];
    for(i=x-1; i<=x+1; i++) {
      for(j=y-1;j<=y+1; j++) {
        if (!(i===x && j===y)) {
          neighbors.push([i, j]);
        }
      }
    }
    return neighbors;
  }

  that.getDeadNeighbors = function(x, y) {
    return that.getNeighborIndices(x, y).filter(function(key) { console.log(key); return !([key] in grid); });
  };

  that.getTotalLiveNeighbors = function(x, y) {
    return that.getNeighborIndices(x, y).filter(function(key) { return ([key] in grid); }).length;
  };
  Object.freeze(that);
  return that;
};