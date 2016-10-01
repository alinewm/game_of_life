(function() {
	document.addEventListener('DOMContentLoaded', function () {
		var game = GameOfLife();
		var board = Board();

		MenuWidget($('menu'), board, game);
		BoardWidget($('board'), board);

	// 	board.on('start-btn-clicked', function() {
	// 		// Get all the live nodes
	// 		// update the live nodes
	// 		// start the game
	// 		setInterval(function() {
	// 			updates = game.step();
	// 			updates.each do |update|
	// 				board.makeChange(update);
	// 				grid.draw(update);
	// 			end
	// 			board.redraw(updates)
	// 		}, 1000);	
	// 	})
	});
})();