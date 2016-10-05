/*
Create a Board object. A Board contains the locations of living cells.
@constructor
*/
var Board = function() {
  that = {};
  that = Object.create(Board.prototype);
  var grid = {};
  var subscribers = [];

  /*
  Attach particular subscriber to a Board object.
  @param{function}
  */
  that.subscribe = function(subscriber) {
    subscribers.push(subscriber);
  }

  /*
  Alert subscribers of a change.
  @param{Integer, Integer}
  */
  var publishChanges = function(x, y) {
    subscribers.forEach(function(subscriber) { subscriber(x,y); });
  }

  /*
  Add group of living cells.
  @param {array} lst, the array of xy coordinates
  */
  that.makeLive = function(lst) {
    lst.forEach(function(coordinates) { 
      var x = coordinates[0];
      var y = coordinates[1];
      grid[[x,y]] = true;
      publishChanges(x, y);
    });
  };

  /*
  Kill group of living cells -> remove them from the grid.
  @param {array} lst, the array of xy coordinates
  */
  that.kill = function(lst) {
    lst.forEach(function(coordinates) { 
      var x = coordinates[0];
      var y = coordinates[1];
      delete grid[[x,y]];
      publishChanges(x, y);
    });
  };

  /*
  Check if the cell inhabiting certain xy coordinate is alive.
  @param {array} xyList, the xy coordinates in array format
  */
  that.isAlive = function(xyList) {
    return (xyList in grid);
  };

  /*
  Get all the live cells in the board with xy coordinates as integers.
  @param
  */
  that.getAllAlive = function() {
    var result = Object.keys(grid).map(function(pair) {
      var x = pair.split(',')[0];
      var y = pair.split(',')[1];
      return [parseInt(x), parseInt(y)];
    });
    return result;
  };

  /*
  Get neighbor indices of a particular cell given its x and y coordinates.
  @param{}
  */
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

  /*
  Amongst neighbors of a particular cell get the ones that are dead.
  @param{}
  */
  that.getDeadNeighbors = function(x, y) {
    return that.getNeighborIndices(x, y).filter(function(key) { return !that.isAlive(key); });
  };

  /*
  Amongst neighbors of a particular cell get the ones that are alive.
  @param{}
  */
  that.getTotalLiveNeighbors = function(x, y) {
    return that.getNeighborIndices(x, y).filter(function(key) { return that.isAlive(key); }).length;
  };

  Object.freeze(that);
  return that;
};