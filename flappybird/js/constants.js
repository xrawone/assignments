
const CANVAS_HEIGHT=512;
const CANVAS_WIDTH=550;
const bg=118;
let bgwidth=288;
const BACKGROUND=new Image();
const imgPath= "images/bg.png";
const PIPEUP=new Image();    
const PIPEDOWN=new Image();
const BASEGROUND=new Image();
const BIRD=new Image();
const START=new Image();
const RESTART=new Image();
const SCOREBOARD=new Image();
const BRONZE=new Image();
const SILVER=new Image();
const GOLD=new Image();
BACKGROUND.src=imgPath;

BASEGROUND.src="images/base.png";
var gameFrame;
PIPEUP.src="images/1.png";
PIPEDOWN.src="images/2.png";
BIRD.src="images/flappy3.png";
START.src="images/start.png";
BRONZE.src="images/bronzemedal.png";
SILVER.src="images/silvermedal.png";
GOLD.src="images/goldmedal.png";
RESTART.src="images/gameover.png";
SCOREBOARD.src="images/high-score.png"
let canvas=document.getElementById('canvas');
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;


