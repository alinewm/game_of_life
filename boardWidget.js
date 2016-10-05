var BoardWidget = function(domContainer, board) {
  var jqueryBoard = [];

  var Cell = function(x, y) {
    var node = $("<div>").css({
        "width": "10px",
        "height": "10px",
        "border": "1px solid black",
        "float": "left",
        "background-color": "white"
      }).click(function() {
        board.makeLive([[x, y]]);
        // console.log(board.getAllAlive());
      });
    return node;
  };

  for(y=0; y<50; y++) {
    var row = $(document.createElement("div"));
    var jqueryRow = [];
    for(x=0; x<50; x++) {
      var cell = Cell(x, y);
      row.append(cell);
      jqueryRow.push(cell);
    }
    $('#board').append(row);
    jqueryBoard.push(jqueryRow);
  }

  var recolorBoard = function(x, y) {
    if (x>=0 && y>=0) { //handles attempt to color out of grid
      if (board.isAlive([x,y])) {
        jqueryBoard[y][x].css("background-color", "green");
      } else {
        jqueryBoard[y][x].css("background-color", "white");
      }
    }
  };

  board.subscribe(function(x, y) {
    recolorBoard(x, y);
  });
};
