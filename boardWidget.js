var BoardWidget = function(domContainer, board) {

  var Cell = function(x, y) {
    var id = 'x' + x + 'y' + y
    var node = $("<div id=" + id + ">").css({
        "width": "10px",
        "height": "10px",
        "border": "1px solid black",
        "float": "left",
        "background-color": "white"
      }).click(function() {
        // $(this).css("background-color", "green");
        board.makeLive([[x, y]]);
        console.log(board.getAllAlive());
      });
    return node;
  };

  domContainer.css({
    "position": "absolute",
    "width": "600px",
    "height": "auto"
  });

  for(y=1; y<=50; y++) {
    var row = $(document.createElement("div"));
    for(x=1; x<=50; x++) {
      row.append(Cell(x, y));
    }
    $('#board').append(row);
  }

  var recolorBoard = function() {
    console.log('recolorBoard');
    board.getAllAlive().forEach(function(coordinate) {
      console.log(coordinate);
      var x = coordinate[0];
      var y = coordinate[1];
      var id = '#x' + x + 'y' + y
      $(id).css("background-color", "green");
    })
    board.getAllDead().forEach(function(coordinate) {
      console.log(coordinate);
      var x = coordinate[0];
      var y = coordinate[1];
      var id = '#x' + x + 'y' + y
      $(id).css("background-color", "white");
    })
  };

  board.subscribe(function() {
    recolorBoard();
  });
};