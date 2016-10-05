/*
Create a BoardWidget object. It handles the Board UI.
@param{Board}
*/
var BoardWidget = function(domContainer, board) {
  var jqueryBoard = [];

  var Cell = function(xyList) {
    var node = $("<div>").css({
        "width": "10px",
        "height": "10px",
        "border": "1px solid black",
        "float": "left",
        "background-color": "white"
      }).click(function() {
        if (board.isAlive(xyList)) {
          board.kill([xyList]);
        } else {
          board.makeLive([xyList]);
        }
      });
    return node;
  };

  /*
  Draw board configuration depending on the mode selected.
  @param{String} alternative, the initial board configuration a user selects.
  */
  var draw = function(alternative) {
    switch(alternative) {
      case 'stripes':
        console.log(alternative);
          for(y=0; y<50; y++) {
            for(x=0; x<50; x++) {
              if(y%2==0) {
                board.makeLive([[x, y]]);
              } else {
                board.kill([[x, y]]);
              }
            }
          }
        break;
      case 'clusters':
        console.log(alternative);
         for(y=0; y<50; y++) {
            for(x=0; x<50; x++) {
              if(y%2===0 && x%2===0) {
                board.kill([[x, y]]);
              } else {
                board.makeLive([[x, y]]);
              }
            }
          }
        break;
      case 'islands':
        console.log(alternative);
         for(y=0; y<50; y++) {
            for(x=0; x<50; x++) {
              if(y%2===0 && x%2===0) {
                board.makeLive([[x, y]]);
              } else {
                board.kill([[x, y]]);
              }
            }
          }
        break;
      default:
        for(y=0; y<50; y++) {
          for(x=0; x<50; x++) {
            board.kill([[x, y]]);
          }
        }
    }
  };

  var selector = $('<select>');
  selector.append($('<option>').val('custom').html('Custom'));
  selector.append($('<option>').val('stripes').html('Stripes'));
  selector.append($('<option>').val('islands').html('Islands'));
  selector.append($('<option>').val('clusters').html('Clusters'));

  selector.change(function() {
    $("select option:selected").each(function() {
      draw($(this).val());
    })
  });
  domContainer.append(selector);


  for(y=0; y<50; y++) {
    var row = $('<div>');
    var jqueryRow = [];
    for(x=0; x<50; x++) {
      var cell = Cell([x, y]);
      row.append(cell);
      jqueryRow.push(cell);
    }
    domContainer.append(row);
    jqueryBoard.push(jqueryRow);
  }

  /*
  Update board UI representation of a live/dead cell.
  @param{Integer} x, the x coordinate of the cell.
  @param{Integer} y, the y coordinate of the cell.
  */
  var recolorBoard = function(x, y) {
    if (x>=0 && x<50 && y>=0 && y<50) { //handles attempt to color out of grid
      if (board.isAlive([x,y])) {
        // console.log('test'+ x + ' ' + y);
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
