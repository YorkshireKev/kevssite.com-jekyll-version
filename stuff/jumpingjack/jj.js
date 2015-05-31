/*
Jumping Jack

v0.1 K Ellis 15/12/2010

This is an experiment in HTML5's canvas and javascript by Kevin Ellis
Feel free to nick my code, but be warned that it probably sucks!
This simple game was inspired by the zx spectrum classic from 1983 of the same name.
*/

//nasty globals, but they are needed everywhare and i'm too lazy to
//structure my code properly for this experiment game...
canvas = document.getElementById('canvas'); 
context = canvas.getContext('2d');

//define some simple global variables to hold the canvas size.
var width = canvas.width;
var height = canvas.height;

holeRow = new Array(6);
holePos = new Array(6);
holeSpeed = new Array(6);
holeDir = new Array(6);

var Xpos = 50;
var Ypos = 300;
var jumpPos = 0;
var fallPos = 0;
var facingLeft = false;

var leftKeyDown = false;
var rightKeyDown = false;
var jumpKeyDown = false;
var jumping = false;
var jumpFalling = false;
var stunned = 0;
falling = false;

var clearCanvas = function()
{
//blank out the screen/canvas to white ready to re-draw everything
context.clearRect(0,0,width,height);
//Now draw the platform bars.
context.fillStyle = '#ff0000';
context.beginPath();
context.rect(0, 42, width, 8);
context.rect(0, 92, width, 8);
context.rect(0, 142, width, 8);
context.rect(0, 192, width, 8);
context.rect(0, 242, width, 8);
context.rect(0, 292, width, 8);
context.rect(0, 342, width, 8);
context.closePath();
context.fill();
}

var drawHoles = function()
{
context.fillStyle = '#ffffff';
context.beginPath();
for (var ix = 0; ix < 6; ix++)
  {
  context.rect(holePos[ix], holeRow[ix], 50, 10); 
  if (holeDir[ix] == 0)
    {
    holePos[ix] = holePos[ix] + holeSpeed[ix];
    if (holePos[ix] > 500) holePos[ix] = -50;
    }
  else
    {
    holePos[ix] = holePos[ix] - holeSpeed[ix];
    if (holePos[ix] < -50) holePos[ix] = 500;
    }
  }
context.closePath();
context.fill();
}

var initHoles = function()
{
for (var ix = 0; ix < 6; ix++)
  {
  holePos[ix] = Math.floor(Math.random()*500);
  holeRow[ix] = 41 + (ix * 50);
  holeSpeed[ix] = (ix % 3) + 1;
  holeDir[ix] = Math.floor(Math.random()*2);
  }
}

var moveCharacter = function()
{
	if (stunned > 0)
	{
		stunned--
	} else
	{
		if (leftKeyDown == true && jumping == false)
		{
			Xpos = Xpos - 2;
			if (Xpos < -20) Xpos = 500;
			facingLeft = true;
		}

		if (rightKeyDown == true && jumping == false)
		{
			Xpos = Xpos + 2;
			if (Xpos > 500) Xpos = -20;
			facingLeft = false; 
		}

		if (jumpKeyDown == true && jumping == false && Ypos > 10)
		{
			jumping = true;
			jumpFalling = false;
			jumpPos = 0;
		}
	
		if (jumping == true)
		{
			//Lets see if we've hit the roof
			var currRow = Math.floor((Ypos - 1) / 50); 
			var holeAbove = ((holePos[currRow] < Xpos) && (holePos[currRow] +30 > Xpos));
			if (jumpFalling == false && jumpPos > 6) holeAbove = true; //Fudge to make the game easier by only checking top third of body is clear.
			if (holeAbove == true && jumpFalling == false) {
				//Our man is jumping!				
				jumpPos++;
				if (jumpPos > 15)
				{
					jumping = false;
					Ypos -= 2 
				}
				Ypos = Ypos - 3;
			} else //end man jumping
			{
				if (jumpPos < 1)
				{
					jumping = false;
					stunned = 120; //stunned for a bit (can't move)
				} else
				{
					Ypos = Ypos + 3;
					jumpPos--;
				}
			} //end man falling
		}
	} //end not stunned	
	
	//Now check to see if man is falling down a hole...
	var currRow = Math.floor((Ypos + 1) / 50);
	var holeBelow = ((holePos[currRow] < Xpos) && (holePos[currRow] +30 > Xpos) && currRow < 6);
	if (holeBelow == true && jumping == false && falling == false)
	{
		falling = true;
		fallPos = 16;
	}

	if (falling == true)
	{
		if (fallPos > 0)
		{
			Ypos = Ypos + 3;
			fallPos--;
		} else
		{
			falling = false;
			Ypos = Ypos + 2;
			stunned = 120; //stunned for a bit (can't move)
		}
	}// end falling down hole
}

var drawCharacter = function()
{		
	if (facingLeft == true)
	{
		if (stunned > 0) context.drawImage(characterBustLeft, Xpos, Ypos);
		else context.drawImage(characterLeft, Xpos, Ypos);
	} else 
	{
		if (stunned > 0) context.drawImage(characterBustRight, Xpos, Ypos);
		else context.drawImage(characterRight, Xpos, Ypos);
	}

	if (Ypos < 10)
	{
		var currRow = Math.floor((Ypos + 1) / 50);
		var holeBelow = ((holePos[currRow] < Xpos) && (holePos[currRow] +30 > Xpos) && currRow < 6);
		context.fillStyle    = '#00f';
		context.font         = 'italic 30px sans-serif';
		context.textBaseline = 'top';
		context.fillText('You made it!', 150, 160);
	}
}

var onKeyDown = function(event)
{
	if (event.keyCode == 37) leftKeyDown = true;
	if (event.keyCode == 39) rightKeyDown = true;
	if (event.keyCode == 32) jumpKeyDown = true;
}

var onKeyUp = function(event)
{
	if (event.keyCode == 37) leftKeyDown = false;
	if (event.keyCode == 39) rightKeyDown = false;
	if (event.keyCode == 32) jumpKeyDown = false;
}
	

//MAIN starting point of code...

//Add key lisener events
document.body.addEventListener("keydown", onKeyDown, false);
document.body.addEventListener("keyup", onKeyUp, false);

//Load image and do initial display to force pre-loading...
characterLeft = new Image();
characterLeft.onload = function() {
context.drawImage(characterLeft, 50,50);
}
characterLeft.src = 'char-left.png';

characterRight = new Image();
characterRight.onload = function() {
context.drawImage(characterRight, 50,50);
}
characterRight.src = 'char-right.png';

characterBustLeft = new Image();
characterBustLeft.onload = function() {
context.drawImage(characterBustLeft, 50,50);
}
characterBustLeft.src = 'char-bustleft.png';

characterBustRight = new Image();
characterBustRight.onload = function() {
context.drawImage(characterBustRight, 50,50);
}
characterBustRight.src = 'char-bustright.png';

initHoles(); //initialise the hole starting positions etc.

//MAIN GAME LOOP
var GameLoop = function()
{
var date1 = new Date(); //get time for start of gameloop

clearCanvas(); //Clear canvas and draws platforms (without holes)

drawHoles(); //Moves and draws the holes
moveCharacter();
drawCharacter();

//calculate the time to wait for 50fps
//1000ms / 50 = 20, less how long the game loop has just taken.
//if the delay is negative, then make 0 (i.e. dont wait!).
var date2 = new Date(); //get time for end of game loop
var delay = date2 - date1
var delay = 20 - delay
if (delay < 0) delay = 0;
loopit = setTimeout(GameLoop, delay);
}
GameLoop();
