/*To do:
- enable drag and drop
- enable arrow functions

*/

'use strict';

//creates the win dictionary, and determines what coordinates are available
function boardSize(givenNum){
	var fullSize = givenNum + 1,
		rowSize = Math.floor(Math.sqrt(fullSize)),
		positions = [],
		win = {};
	
	for (var x = 0; x < rowSize; x++){
		for (var y = 0; y < rowSize; y++){
			positions.push([x, y])
		}
	}//end coordinates creation;

	for (var x = 1; x < fullSize; x++){
		win[x] = positions[x-1];
	}//end dictionary creation;

	win.empty = positions[givenNum];
	return [win, positions];
}//end boardSize;




function playGame(givenNum){
	var positions = boardSize(givenNum)[1],
		win = boardSize(givenNum)[0],
		board = {},
		counter = 0;

	//randomly select key in board;
	function randomPosition(){
		var x = Math.ceil(Math.random() * givenNum);

		//if the key is unassigned, place value;
		if (!board[x]) {
			board[x] = positions.shift();
			return;
		}
		//else try again
		else {
			randomPosition();
		}
	}//end randomPosition;

	//create a dictionary with keys assigned to a random coordinate;
	function setBoard(){
		while (Object.keys(board).length < givenNum)
			randomPosition();
		board.empty = positions.shift();
	}//end setBoard;


	//updates the dictionary position of the piece.
	function movePiece(piece){
		var moves = [[0, 1],[0, -1],[1,0],[-1,0]];
		var newPosition = [];

		for (var pos in moves){
			var x = [];
			x.push(parseInt(moves[pos][0]) + parseInt(board[piece][0]));
			x.push(parseInt(moves[pos][1]) + parseInt(board[piece][1]));
			
			//do the coordiates of the empty space match any of the possible moves?
			if (board.empty[0] === x[0] && board.empty[1] === x[1]){
				newPosition = x;
				counter++;
				return newPosition;
			}
		}//end for
		return null;
	};//end movePiece

	//determine if all the pieces are in the correct position.
	function calculateWin(){
		var x = 0;
		for (var key in board){
			if (board[key][0] === win[key][0] && board[key][1] === win[key][1]) {
				x++;
			}
			else {
				return false;
			}
		}
		if (x == givenNum + 1) {
			return true;
		}
	}

	//pretty print the board to the console.
	function displayBoard(){
		var boardPrint = [];

		//keys are in order. Coordinates are not. Add keys to be printed in the correct coordinates order.
		for (var winKey in win){
			for (var key in board){
				if (board[key][0] === win[winKey][0] && board[key][1] === win[winKey][1])
					boardPrint.push(key);
			}
			
		}

		boardPrint.forEach(function(x){
			var dimensions = Math.sqrt(givenNum + 1);
			
			var node = document.createElement('div');
			node.setAttribute('id', 'square');
			node.style.width = (100/dimensions) + '%';
			node.style.height = (100/dimensions) + '%';
			node.style.padding = (100/dimensions/4) + '%';
			
			if (x == 'empty')
				node.setAttribute('class','empty');

			var textNode = document.createTextNode(x);
			node.appendChild(textNode);

			node.addEventListener('click', function(e){
				var newPosition = movePiece(this.textContent);

				if (newPosition){
					board.empty = board[this.textContent];
					board[this.textContent] = newPosition;

					document.getElementsByClassName('empty')[0].textContent = this.textContent;
					document.getElementsByClassName('empty')[0].removeAttribute('class');

					if(calculateWin()){
						document.getElementById('moves').textContent = "You won! It took you " + counter + " moves.";
						//this.setAttribute('class', 'empty');
						this.textContent = givenNum + 1;
						return;
					} else {
						document.getElementById('counter').textContent = counter;
					}
					this.setAttribute('class', 'empty');
					this.textContent = 'empty';
				} else {
					console.log("can't go there");
				}
				
				//displayBoard();
			});

			document.getElementById('game').appendChild(node);
			


		});
		var displayCounter = document.createTextNode(counter);
		document.getElementById('counter').appendChild(displayCounter)
	}

	
	setBoard();
	displayBoard();
	
}



playGame(4*4 -1);




