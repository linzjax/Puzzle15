'use strict';
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
		console.log('position',board[piece]);
		//possible moves;
		let moves = [[0, 1],[0, -1],[1,0],[-1,0]];
		let newPosition = [];
		for (let pos in moves){
			let x = [];
			x.push(parseInt(moves[pos][0]) + parseInt(board[piece][0]));
			x.push(parseInt(moves[pos][1]) + parseInt(board[piece][1]));
			if (board._[0] === x[0] && board._[1]=== x[1]){
				newPosition = x;
				break;
			} else {
				newPosition = null;
			}
		}//end for
		if (newPosition){
			board._ = board[piece];
			board[piece] = newPosition;
		} else {
			console.log("can't go there");
		}
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
			node.setAttribute('class',x);

			if (x == '_'){
				node.setAttribute('class','empty');
			}
			let textNode = document.createTextNode(x);
			node.appendChild(textNode);
			node.addEventListener('click', function(e){
				movePiece(this.textContent);
				//I want to just update the squares that changed.
				document.getElementsByClassName('empty');
				this.setAttribute('class','empty');
				if (this.getAttribute('class') !== this.textContent)
					console.log('change');
				//displayBoard();
			});
			document.getElementById('game').appendChild(node);

		});

		
	}

	
	setBoard();
	displayBoard();
	
}



playGame();




