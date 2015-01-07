!function(){"use strict";function a(a){var b,c;for(g.pixelSize=Math.floor(Math.floor(h.width/320)<Math.floor(h.height/200)?h.width/320:h.height/200),g.player1={xPos:289,yPos:100,dir:0,crashed:!1},g.player2={xPos:30,yPos:100,dir:1,crashed:!1},g.inGame=!0,g.players=a,g.endMessage="Welcome to LightCycles",i.clearRect(0,0,h.width,h.height),g.gameGrid=[],g.gameDrawn=[],c=0;320>c;c+=1)for(b=0;200>b;b+=1)g.gameGrid[320*c+b]=0,g.gameDrawn[320*c+b]=0,(0===b||199===b)&&(g.gameGrid[320*c+b]=1),(0===c||319===c)&&(g.gameGrid[320*c+b]=1)}function b(){var a,b,c,d,e,f;for(c=(h.width-320*g.pixelSize)/2,d=(h.height-200*g.pixelSize)/2,b=0;320>b;b+=1)for(a=0;200>a;a+=1)if(e=g.gameGrid[320*b+a],f=g.gameDrawn[320*b+a],e!==f){switch(e){case 1:i.fillStyle="#00e2ff";break;case 2:i.fillStyle="#ff0000";break;case 3:i.fillStyle="#00ff00";break;default:i.fillStyle="#000000"}i.fillRect(b*g.pixelSize+c,a*g.pixelSize+d,g.pixelSize,g.pixelSize),g.gameDrawn[320*b+a]=e}}function c(){var a;if(1===g.players)switch(a=Math.floor(2*Math.random()),g.player2.dir){case 0:0!==g.gameGrid[320*(g.player2.xPos-1)+g.player2.yPos]&&(g.player2.dir=0===a?0===g.gameGrid[320*g.player2.xPos+(g.player2.yPos-1)]?2:3:0===g.gameGrid[320*g.player2.xPos+(g.player2.yPos+1)]?3:2);break;case 1:0!==g.gameGrid[320*(g.player2.xPos+1)+g.player2.yPos]&&(g.player2.dir=0===a?0===g.gameGrid[320*g.player2.xPos+(g.player2.yPos+1)]?3:2:0===g.gameGrid[320*g.player2.xPos+(g.player2.yPos-1)]?2:3);break;case 2:0!==g.gameGrid[320*g.player2.xPos+(g.player2.yPos-1)]&&(g.player2.dir=0===a?0!==g.gameGrid[320*(g.player2.xPos-1)+g.player2.yPos]?1:0:0!==g.gameGrid[320*(g.player2.xPos+1)+g.player2.yPos]?0:1);break;case 3:0!==g.gameGrid[320*g.player2.xPos+(g.player2.yPos+1)]&&(g.player2.dir=0===a?0!==g.gameGrid[320*(g.player2.xPos+1)+g.player2.yPos]?0:1:0!==g.gameGrid[320*(g.player2.xPos-1)+g.player2.yPos]?1:0)}switch(g.player1.dir){case 0:g.player1.xPos-=1;break;case 1:g.player1.xPos+=1;break;case 2:g.player1.yPos-=1;break;case 3:g.player1.yPos+=1}switch(0===g.gameGrid[320*g.player1.xPos+g.player1.yPos]?g.gameGrid[320*g.player1.xPos+g.player1.yPos]=2:g.player1.crashed=!0,g.player2.dir){case 0:g.player2.xPos-=1;break;case 1:g.player2.xPos+=1;break;case 2:g.player2.yPos-=1;break;case 3:g.player2.yPos+=1}0===g.gameGrid[320*g.player2.xPos+g.player2.yPos]?g.gameGrid[320*g.player2.xPos+g.player2.yPos]=3:g.player2.crashed=!0}function d(){return g.player1.crashed===!0&&g.player2.crashed===!0||g.player1.xPos===g.player2.xPos&&g.player1.yPos===g.player2.yPos?(g.inGame=!1,"Both players have crashed! It's a draw!"):g.player1.crashed===!0?(g.inGame=!1,"Red has crashed. Green Wins!"):g.player2.crashed===!0?(g.inGame=!1,"Green has crashed. Red Wins!"):void 0}function e(a){i.font=15*g.pixelSize+"px Arial",i.textAlign="center",i.fillStyle="#ffeb00",i.fillText(a,h.width/2,h.height/2-30*g.pixelSize),i.font=10*g.pixelSize+"px Arial",i.fillStyle="#d4c406",i.fillText("Press 1 for 1 player (Computer Plays Green), or 2 for 2 players",h.width/2,h.height/2+40*g.pixelSize),i.fillStyle="#7ee8f5",i.fillText("Green Player: Q, A, Z and X. Red Player: O, P, N and M",h.width/2,h.height/2+70*g.pixelSize)}function f(){setTimeout(function(){window.requestAnimationFrame(f),g.inGame===!0?(c(),g.endMessage=d(),b()):e(g.endMessage)},25)}var g={},h=document.getElementById("canvas"),i=h.getContext("2d");h.width=window.innerWidth,h.height=window.innerHeight,window.addEventListener("keydown",function(b){switch(b.keyCode){case 78:1!==g.player1.dir&&(g.player1.dir=0);break;case 77:0!==g.player1.dir&&(g.player1.dir=1);break;case 80:3!==g.player1.dir&&(g.player1.dir=2);break;case 76:2!==g.player1.dir&&(g.player1.dir=3);break;case 49:g.inGame===!1&&a(1);break;case 50:g.inGame===!1&&a(2)}if(2===g.players)switch(b.keyCode){case 90:1!==g.player2.dir&&(g.player2.dir=0);break;case 88:0!==g.player2.dir&&(g.player2.dir=1);break;case 81:3!==g.player2.dir&&(g.player2.dir=2);break;case 65:2!==g.player2.dir&&(g.player2.dir=3)}},!1),a(0),g.inGame=!1,f()}();