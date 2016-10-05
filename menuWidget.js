var MenuWidget = function(domContainer, board, game) {
  var startButton =
  	$(document.createElement("button")).css({
      }).html("Start").click(function() {
        $(this).css("background-color", "gray");
        game.start(board);
      });
  var stopButton = 
    $(document.createElement("button")).css({
        }).html("Stop").click(function() {
          $(this).css("background-color", "gray");
          game.stop();
        });
  var stepButton = 
    $(document.createElement("button")).css({
        }).html("Step").click(function() {
          $(this).css("background-color", "gray");
          game.step(board);
        });
  $('#menu').append(startButton);
  $('#menu').append(stopButton);
  $('#menu').append(stepButton);
};