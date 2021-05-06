let noOfMoves = 0;;
let canvas;
let context;
let t = 0;
let i = 0;
let model = {
  board: "......./......./......./......./......./.......",
  next: "X",
}


function tick() {
  window.requestAnimationFrame(splat);
}

function splat(n) {
  let d = n - t;
  t = n;
  context.clearRect(0,0,canvas.width,canvas.height);

  // Taken from https://www.html5canvastutorials.com/tutorials/html5-canvas-lines/\
  // Edited from tic tac troe example
    context.beginPath();
    context.moveTo(20, 120 + -.85 * 120);
    context.lineTo(840, 120 + -.85 * 120);
    context.strokeStyle = '#3a9fbf';
    context.lineWidth = 5;
    context.stroke();
    context.beginPath();
    context.moveTo(120 + -.85 * 120, 20);
    context.lineTo(120 + -.85 * 120, 720);
    context.strokeStyle = '#3a9fbf';
    context.lineWidth = 5;
    context.stroke();
  for(let i = 0;i < 6;i++) {
    context.beginPath();
    context.moveTo(20, 120 + i * 120);
    context.lineTo(840, 120 + i * 120);
    context.strokeStyle = '#3a9fbf';
    context.lineWidth = 5;
    context.stroke();
  }
  for(let i = 0;i < 7;i++) {
    context.beginPath();
    context.moveTo(120 + i * 120, 20);
    context.lineTo(120 + i * 120, 720);
    context.strokeStyle = '#3a9fbf';
    context.lineWidth = 5;
    context.stroke();
  }
  context.font = "28pt Calibri"
  context.fillStyle = "red";

  for(let i = 0; i <= 6; i++) {
    for(let j = 0; j <= 5; j++) {
      let me = model.board.charAt(i + j * 8);
      if (me != '.') {
	context.fillText(me, 50 + i * 120, 50 + j * 120);
      }
    }
  }
  context.font = "20pt Calibri"
  context.fillStyle = "purple";
  context.fillText(JSON.stringify(model), 10, 850);

  //numbers on bottom row
  for(let i = 1; i<=7; i++)
  {
    context.fillText(i,50+ (i-1) * 120, 750);
  }


  tick();
}
function displayWinner(winner)
{
  alert("Player " + winner + " WINS");
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector("#myCanvas");
  console.log("Got here");
  context = canvas.getContext("2d");
  console.log(context);
  splat();
})

function roundMe(x){ return Math.ceil((x-20)/120)-1 }

document.addEventListener("click", e => {
  const [i,j] = [e.x,e.y].map(roundMe);
  if (i < 0 || i > 6) return;
  if (j < 0 || j > 5) return;

  const ix = i + j * 8;
  if (model.board.charAt(ix) != '.') {
    return;
  }
  if (model.board.charAt(ix+8) == '.') {
    return;
  }


  console.log(i,j,ix)
  model.board =
    model.board.slice(0,ix) +
    model.next +
    model.board.slice(ix+1,47)

    let winner = 'n';

    //Check rows for a win
    for (let row = 0; row < 6; row++)
    {
      for (let col = 0; col < 4; col++)
      {

        if (model.board.charAt(col + row * 8) == model.next && model.board.charAt(col + row * 8 + 1) == model.next && model.board.charAt(col + row * 8 + 2) == model.next && model.board.charAt(col + row * 8 + 3) == model.next)
        {
          console.log("WINNER: " + model.next);
          winner = model.next;
        }
      }
    }

    //Check columns for a win
	for (let col = 0; col < 7; col++)
	{
		for (let row = 0; row < 3; row++)
		{
			if (model.board.charAt(col + row * 8) == model.next && model.board.charAt(col + (row + 1) * 8) == model.next && model.board.charAt(col + (row + 2) * 8) == model.next && model.board.charAt(col + (row + 3) * 8) == model.next)
      {
        console.log("WINNER: " + model.next);
        winner = model.next;
      }
		}
	}

	//Check diagonals for a win
	//Diagonals from bottom left to top right of game board
	for (let row = 5; row > 2; row--)
	{
		for (let col = 0; col < 4; col++)
		{
			if (model.board.charAt(col + row * 8) == model.next && model.board.charAt((col + 1) + (row - 1) * 8) == model.next && model.board.charAt((col + 2) + (row - 2) * 8) == model.next && model.board.charAt((col + 3) + (row - 3 ) * 8) == model.next)
      {
        console.log("WINNER: " + model.next);
        winner = model.next;
      }
		}
	}

	//Diagonals from top left to bottom right of game board
	for (let col = 0; col < 4; col++)
	{
		for (let row = 2; row > -1; row--)
		{
			if (model.board.charAt(col + row * 8) == model.next && model.board.charAt((col + 1) + (row + 1) * 8) == model.next && model.board.charAt((col + 2) + (row + 2) * 8) == model.next && model.board.charAt((col + 3) + ( row + 3) * 8) == model.next)
      {
        console.log("WINNER: " + model.next);
        winner = model.next;
      }
		}
	}
  noOfMoves++;

  if (winner != 'n')
  {
    //displayWinner(winner);
    setTimeout(() => {  displayWinner(winner); }, 50);
  }
  if (noOfMoves == 42)
  {
    setTimeout(() => {  alert("IT IS A TIE!!!"); }, 50);
    setTimeout(() => {  location.reload(); }, 50);
  }

  if (model.next == 'X') {
    model.next = 'O'
  } else if (model.next == 'O') {
    model.next = 'X'
  }




})
