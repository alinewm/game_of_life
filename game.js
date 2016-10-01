var GameOfLife = function() {
  var that = {}
  var that = Object.create(GameOfLife.prototype);

  that.start = function() {
      setInterval(function() {
      that.step();
      // updates.each do |update|
      //   board.makeChange(update);
      //   grid.draw(update);
      // end
      // board.redraw(updates)
    }, 1000);
  };

  that.step = function(board) {
    console.log('step');
    var toKill = [];
    var toLive = [];
    board.getAllAlive().forEach(function(cell) {
      console.log('cell' + cell[0] + ' ' + cell[1]);
      var x = cell[0];
      var y = cell[1];
      var neighbors = board.getNeighbors(x, y);
      if (neighbors < 2 || neighbors > 3) {
        toKill.push([x, y]);
      } else {
        toLive.push([x, y]);
      }
    });
    board.getAllDead().forEach(function(cell) {
      var x = cell[0];
      var y = cell[1];
      var neighbors = board.getNeighbors(x, y);
      if (neighbors === 3) {
        toLive.push([x, y]);
      };
    });
    board.makeLive(toLive);
    console.log('kill');
    console.log(toKill);
    console.log('end');
    board.kill(toKill);
  };
  Object.freeze(that);
  return that;
};