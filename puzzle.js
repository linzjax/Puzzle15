/*To do:
- add a counter
- calculate a win
- enable drag and drop
- enable arrow functions
- rescale based on a given number
*/

'use strict';

/*So how would I calculate a board
it's the square root of the big number. So Puzzle 15 + 1

*/




let win = {
	1: [0,0],
	2: [1,0],
	3: [2,0],
	4: [3,0],
	5: [0,1],
	6: [1,1],
	7: [2,1],
	8: [3,1],
	9: [0,2],
	10: [1,2],
	11: [2,2],
	12: [3,2],
	13: [0,3],
	14: [1,3],
	15: [2,3],
	_: [3,3],
};



let board = {};

function playGame(){
	let positions = [[0,0],[1,0],[2,0],[3,0],
					[0,1],[1,1],[2,1],[3,1],
					[0,2],[1,2],[2,2],[3,2],
					[0,3],[1,3],[2,3],[3,3]];

	//reverse lookup keys from coordinate positions;
	function findValue(obj, value){
        for (let key in obj){
            if (obj[key][0] === value[0] && obj[key][1]=== value[1]) {
              return key;
            }
        }
    }//end findValue;
	
	//randomly select key in board;
	function randomPosition(){
		let x = Math.ceil(Math.random() * 15);

		//if the key is available, place value;
		if (!board[x]) {
			board[x] = positions.shift();
		}
		//else try again
		else {
			randomPosition();
		}
	}//end randomPosition;

	//set all pieces;
	function setBoard(){
		while (Object.keys(board).length < 15) {
			randomPosition();
		}
		board._ = positions.shift();
	}//end setBoard;

	//updates the dictionary position of the piece.
	let movePiece = function(piece){
		//when a piece is selected
		//check it's coordinate points.
		//possible moves;
		let moves = [[0, 1],[0, -1],[1,0],[-1,0]];
		let newPosition = [];
		for (let pos in moves){

			let x = [];
			x.push(parseInt(moves[pos][0]) + parseInt(board[piece][0]));
			x.push(parseInt(moves[pos][1]) + parseInt(board[piece][1]));

			//do the coordiates of the empty space match any of the possible moves?
			if (board._[0] === x[0] && board._[1] === x[1]){
				newPosition = x;
				return newPosition;
			}
		}//end for
		return null;
	};//end movePiece

	//pretty print the board to the console.
	function displayBoard(){
		let boardPrint = [];
		//working down the win structure, if 

		for (let key in win){
			boardPrint.push(findValue(board, win[key]));
		}

		boardPrint.forEach(function(x){
			let node = document.createElement('div');
			node.setAttribute('id', 'square');
			

			if (x == '_'){
				node.setAttribute('class','empty');
			}
			let textNode = document.createTextNode(x);
			node.appendChild(textNode);

			node.addEventListener('click', function(e){
				console.log(this.textContent);
				let newPosition = movePiece(this.textContent);

				if (newPosition){
					board._ = board[this.textContent];
					board[this.textContent] = newPosition;

					document.getElementsByClassName('empty')[0].textContent = this.textContent;
					document.getElementsByClassName('empty')[0].removeAttribute('class');

					this.setAttribute('class', 'empty');
					this.textContent = '_';
				} else {
					console.log("can't go there");
				}

				//I want to just update the squares that changed.
				
				
				//displayBoard();
			});
			document.getElementById('game').appendChild(node);

		});

		
	}

	
	setBoard();
	displayBoard();
	
}



playGame();




