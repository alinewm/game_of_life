var GameOfLife = function() {
  var that = {}
  var that = Object.create(GameOfLife.prototype);
  var interval;

  that.start = function(board) {
      interval = setInterval(function() {
      that.step(board);
      // updates.each do |update|
      //   board.makeChange(update);
      //   grid.draw(update);
      // end
      // board.redraw(updates)
    }, 1000);
  };

  that.stop = function() {
    clearInterval(interval);
  };

  that.step = function(board) {
    console.log('step');
    var toKill = [];
    var toLive = [];
    var deadNeighbors = {};

    board.getAllAlive().forEach(function(cell) {
      var x = cell[0];
      var y = cell[1];
      var neighbors = board.getTotalLiveNeighbors(x, y);
      if (neighbors < 2 || neighbors > 3) {
        toKill.push([x, y]);
      } else {
        toLive.push([x, y]);
      }
      board.getDeadNeighbors(x,y).forEach(function(coordinates) {
        if ([coordinates] in deadNeighbors) {
          deadNeighbors[coordinates] += 1;
        } else {
          deadNeighbors[coordinates] = 1;
        }
      })
    });

    Object.keys(deadNeighbors).forEach(function(key) {
      console.log('deadNeighbors '+ key + ' ' + deadNeighbors[key]);
      var x = key.split(',')[0];
      var y = key.split(',')[1];
      if (deadNeighbors[key]===3) {
        toLive.push([x,y]);
      };
    });
    
    board.makeLive(toLive);
    board.kill(toKill);
  };
  Object.freeze(that);
  return that;
};