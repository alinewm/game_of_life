var MenuWidget = function(domContainer, board, game) {
	var instructions = $("<label>")
	.html('Select one of a collection of preset starting states, or create an arbitrary starting configuration');

	// var selector = $('<select>');
	// selector.append($('<option>').val('custom').html('Custom'));
	// selector.append($('<option>').val('circle_of_life').html('Circle of Life'));
	// selector.append($('<option>').val('mandala').html('Mandala'));
	// selector.append($('<option>').val('clusters').html('Clusters'));

	// selector.change(function() {
	// 	$("select option:selected").each(function() {

	// 	})
	// });
  var startButton =
  	$("<button>").css({
      }).html("Start").click(function() {
        $(this).css("background-color", "gray");
        game.start(board);
      });
  var stopButton = 
    $("<button>").css({
        }).html("Stop").click(function() {
          $(this).css("background-color", "gray");
          game.stop();
        });
  var stepButton = 
    $("<button>").css({
        }).html("Step").click(function() {
          $(this).css("background-color", "gray");
          game.step(board);
        });

  domContainer.append(instructions).append($('<br />'));
  // domContainer.append(selector);
  domContainer.append(startButton);
  domContainer.append(stopButton);
  domContainer.append(stepButton);

};