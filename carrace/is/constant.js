const WIDTH=300;
const HEIGHT=500;
canvas=document.getElementById('canvas');
canvas.width=WIDTH;
canvas.height=HEIGHT;
var CAR1=new Image();
var imgPath="./car2.gif"
CAR1.src=imgPath;
var CAR2=new Image();
var imgPath2="./car1.gif"
CAR2.src=imgPath2;
let updatecar=[];
let ctx=canvas.getContext('2d');
ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.moveTo(WIDTH/3,0);
ctx.lineTo(WIDTH/3,HEIGHT);
ctx.moveTo(2*(WIDTH/3),0);
ctx.lineTo(2*(WIDTH/3),HEIGHT);
ctx.setLineDash([10,15]);
var backgroundSpeed=0;
ctx.lineDashOffset=+backgroundSpeed;
ctx.strokeStyle="#fff";
ctx.stroke();

