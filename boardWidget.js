var BoardWidget = function(domContainer, board) {
  var jqueryBoard = [];

  var Cell = function(x, y) {
    var id = 'x' + x + 'y' + y;
    var node = $("<div id=" + id + ">").css({
        "width": "10px",
        "height": "10px",
        "border": "1px solid black",
        "float": "left",
        "background-color": "white"
      }).click(function() {
        board.makeLive([[x, y]]);
        console.log(board.getAllAlive());
      });
    return node;
  };

  for(y=0; y<50; y++) {
    var row = $(document.createElement("div"));
    var jqueryRow = [];
    for(x=0; x<50; x++) {
      var cell = Cell(x, y)
      row.append(cell);
      jqueryRow.push(cell);
    }
    $('#board').append(row);
    jqueryBoard.push(jqueryRow);
  }

  var recolorBoard = function() {
    console.log('recolorBoard');
    for(y=0; y<jqueryBoard.length; y++) {
      for(x=0; x<jqueryBoard.length; x++) {
        jqueryBoard[y][x].css("background-color", "white");
      }
    }

    board.getAllAlive().forEach(function(coordinate) {
      console.log(coordinate);
      var x = coordinate[0];
      var y = coordinate[1];
      console.log('y ' + y);
      console.log('x ' + x);
      if (x>=0 && y>=0) { //handles attempt to color out of grid
        jqueryBoard[y][x].css("background-color", "green");
      };
    });
  };

  board.subscribe(function() {
    recolorBoard();
  });
};
