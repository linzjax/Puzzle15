function playGame(givenNum) {
	var rowSize = Math.sqrt(givenNum + 1);

	//all possible coordinates
	var positions = boardSize(givenNum)[1];

	//the order the coordinates need to be in
	var win = boardSize(givenNum)[0];
	var board = {};
	var movesCounter = 0;

	//creates the win dictionary, and determines what coordinates are available given the size of the board
	function boardSize(givenNum) {
		var fullSize = givenNum + 1;
		var	positions = [];
		var	win = {};

		//creates all possible coordinate points
		for (var yCord = 0; yCord < rowSize; yCord++) {
			for (var xCord = 0; xCord < rowSize; xCord++) {
				positions.push([xCord, yCord]);
			}
		}//end coordinates creation;

		//creates the winning dictionary with keys assigned to coordinates
		for (var key = 1; key < fullSize; key++) {
			win[key] = positions[key - 1];
		}//end dictionary creation;

		//the blank space will always be at the end
		win.empty = positions[givenNum];
		return [win, positions];
	}//end boardSize;


	//randomly select key in board;
	function randomPosition() {
		var x = Math.ceil(Math.random() * givenNum);

		//if the key is unassigned, place value;
		if (!board[x]) {
			board[x] = positions.shift();
			return;
		} else {
			randomPosition();
		}
	}//end randomPosition;

	function compareValues(objA, objB){
		return (objA[0] === objB[0] && objA[1] === objB[1]);
	}


	//create a board dictionary with keys assigned to a random coordinate;
	function setBoard() {
		while (Object.keys(board).length < givenNum)
			randomPosition();

		//empty space is always last
		board.empty = positions.shift();
	}//end setBoard;


	//updates the dictionary position of the piece.
	function movePiece(piece) {
		//it can move up, down, left, or right
		var moves = [[0, 1],[0, -1],[1,0],[-1,0]];
		var newPosition = [];

		//checkout each adjacent square next to the selected piece
		for (var coordinate in moves) {
			var x = [moves[coordinate][0] + board[piece][0], moves[coordinate][1] + board[piece][1]];
			
			//do the coordiates of the empty space match any of the adjacent squares?
			if (compareValues(board.empty, x)) {
				newPosition = x;
				movesCounter++;
				return newPosition;
			}
		}//end for

		return null;
	}//end movePiece

	//determine if all the pieces are in the correct position according the the win dictionary.
	function calculateWin(){
		for (var key in board) {
			if (!compareValues(board[key], win[key]))
				return false;
		}
		return true;
	}//end calculateWin

	function displayBoard() {
		var boardPrint = Object.keys(board);

		//sort the numbers that appear based on their randomly generated coordinate points.
		boardPrint.sort(function compareCoordinates(keyA, keyB){
			var cordA = board[keyA][0] + board[keyA][1] * rowSize;
			var cordB = board[keyB][0] + board[keyB][1] * rowSize;
			return cordA - cordB;
		});

		boardPrint.forEach(function(x) {
			//create an individual square for each number
			var square = document.createElement('div');
			square.setAttribute('id', 'square');
			square.style.width = (100 / rowSize) + '%';
			square.style.height = (100 / rowSize) + '%';
			square.style.padding = (100 / rowSize / 4) + '%';
			
			if (x === 'empty')
				square.setAttribute('class','empty');

			//display the key inside of the new square
			var innerText = document.createTextNode(x);
			square.appendChild(innerText);

			square.addEventListener('click', function(e) {

				//if it's possible to move the piece into the empty space, set newPosition;
				var newPosition = movePiece(this.textContent);

				if (newPosition) {

					//swap the content of the empty square and the square selected within the tracking dictionary
					board.empty = board[this.textContent];
					board[this.textContent] = newPosition;

					//swap the content of the empty square and the square selected for the actual display
					document.getElementsByClassName('empty')[0].textContent = this.textContent;
					document.getElementsByClassName('empty')[0].removeAttribute('class');
					this.setAttribute('class', 'empty');
					this.textContent = 'empty';

					//check if this move triggered a win.
					if(calculateWin()) {
						document.getElementById('moves').textContent = 'You won! It took you ' + movesCounter + ' moves.';
						this.textContent = givenNum + 1;
						return;
					} else {
						displayCounter.textContent = movesCounter;
					}
				}
			});

			document.getElementById('game').appendChild(square);
		});

		var displayCounter = document.createTextNode(movesCounter);
		document.getElementById('counter').appendChild(displayCounter);
	}

	setBoard();
	displayBoard();
}


playGame(15);
