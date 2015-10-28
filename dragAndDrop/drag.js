/* 
TO DO:
Recalculate to be able to use on an arbitrary number of boxes.
*/


"use strict";

let container = 400,
    isDraggable = false;

let storage = {
    currentPos: 0,
    newPos: 0,
    top: 0,
    left: 0
}

//where the boxes are currently absolutely positioned.
let Coordinates = {
  'box1': [0, 0],
  'box2': [0, 200],
  'box3': [200, 0],
  empty : [200, 200]
}

//find out where the mouse clicked on the page
function getPosition(e, cord){
		e = e || window.e;
		let body,
			  doc,
			  eventDocument;
		if (e.pageX === null && e.clientX !== null) {
			eventDocument = (event.target && event.target.ownerDocument) || document;
			doc = eventDocument.documentElement;
			body = eventDocument.body;
      
      //for moving left to right
			event.pageX = event.clientX +
				(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				(doc && doc.clientLeft || body && body.clientLeft || 0);
      
      //for moving up and down
			event.pageY = event.clientY +
				(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
				(doc && doc.clientTop  || body && body.clientTop  || 0 );
		}
  
    //only allow movement in one direction or the other.  
		if (cord === 'x') {
			return e.pageX;
    } else {
			return e.pageY;
    }
}// end getPosition


//check whether the box is next to an empty space and thus moveable.
let canBoxMove = function(whichBox){
  let box = document.getElementsByClassName(whichBox)[0];
  if (Coordinates[whichBox][0] === Coordinates.empty[0] || Coordinates[whichBox][1] === Coordinates.empty[1]) {
    console.log('can move!')
    return true;
  } else {
    return false;
  }
}

//determine whether or not the box is next to a blank space, and which direciton it is allowed to move.
let moveBoxes = function(whichBox){
  let box = document.getElementsByClassName(whichBox)[0],
      direction = '',
      coordinate = '';
  
  //when the user clicks in a box
  box.addEventListener('mousedown', function(e){
    
    //is the box allowed to move?
    if (canBoxMove(whichBox)){
      
      //great! Find out what it's top and left properties currently are.
      storage.top = parseInt(getComputedStyle(box).getPropertyValue("top"));
      storage.left = parseInt(getComputedStyle(box).getPropertyValue("left"));
      
      //is the blank space to the left or right of it?
      if (Coordinates[whichBox][0] === Coordinates.empty[0]){  
         direction = 'left';
         coordinate = 'x';
        
      //other wise the blank space is above or below
      } else {
         direction = 'top';
         coordinate = 'y';
      }
      
      //what's the current mouse position?
      storage.currentPos = getPosition(e, coordinate);
      
      //what's the current value of left or top?
      storage.yay = storage[direction];
      isDraggable = true;
      
    //if the box is not next to the empty space, it box can't move.
    } else {
      isDraggable = false;
    }
  });
  
  //when the user drags somewhere
  box.addEventListener('mousemove', function(e){
    if (isDraggable) {
      
      //where is the mouse now?
      storage.newPos = getPosition(e, coordinate);
      
      //calculate the new left or top based on how far the mouse has moved.
      box.style[direction] = (storage.yay + (storage.newPos - storage.currentPos)) + 'px';
      
      //update it in storage as well
      storage[direction] = parseInt(box.style[direction]);
    }
  });
  
  box.addEventListener('mouseup', function(e){
    if (isDraggable){
      storage.currentPos = getPosition(e,coordinate);

      //has the user dragged it a reasonable amount to be considered moved? Snap it into the whichever place makes the most sense.
      if (storage[direction] > 81) {
        box.style[direction] = "200px";
      } else if (storage[direction] < 80) {
        box.style[direction] = "0px";
      }
      
      storage[direction] = parseInt(box.style[direction]);
      
      //if the box did move from it's old location, update it to it's new coordinates, and set the empty space to the old coordinates of the box just moved.
      if (Coordinates[whichBox][0] !== storage.top || Coordinates[whichBox][1] !== storage.left){
          Coordinates.empty = Coordinates[whichBox];
          Coordinates[whichBox] = [storage.top, storage.left];
      }
    }
    
    isDraggable = false;
  }); 
}

//check how many box divs there are in the container and call moveBoxes on all of them.
let containerBox = document.getElementsByClassName('box');
for (let x = 0; x < containerBox.length; x++){
  moveBoxes(containerBox[x].getAttribute('class').split(' ')[1]);
};



