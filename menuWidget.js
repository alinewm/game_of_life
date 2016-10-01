var MenuWidget = function(domContainer, board, game) {
  var startButton =
  	$(document.createElement("button")).css({
      }).html("Start").click(function() {
        $(this).css("background-color", "gray");
        // game.start();
      });
  var stepButton = 
    $(document.createElement("button")).css({
        }).html("Step").click(function() {
          $(this).css("background-color", "gray");
          game.step(board);
        });
  $('#menu').append(startButton);
  $('#menu').append(stepButton);
};