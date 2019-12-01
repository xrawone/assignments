player1=new Car('player')
var counter=0;
updatecar.push(player1);
var gameCreate=setInterval(creation,1000)
function creation(){
  car=new Car()
 
  updatecar.push(car);

}

var gameFrame=setInterval(setter,10)
function setter(){
  clearCanvas();
  updatecar.forEach((value,index)=>{
      value.move(counter);
      value.draw();
      if (index!=0){
        if(value.y>=HEIGHT){ 
          updatecar.splice(index,1) 
          counter++;
       
        }
        value.collision(player1);
         
      }

  })
  if(counter<=10){
      backgroundSpeed-=3;
  }
  else{
    backgroundSpeed-=7;
  }
}
function clearCanvas(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.moveTo(WIDTH/3,0);
    ctx.lineTo(WIDTH/3,HEIGHT);
    ctx.moveTo(2*(WIDTH/3),0);
    ctx.lineTo(2*(WIDTH/3),HEIGHT);
    ctx.setLineDash([10,15]);
    ctx.lineDashOffset=backgroundSpeed;
    ctx.strokeStyle="#fff";
    ctx.stroke();
    ctx.font = "50px Arial";
    ctx.strokeText(`SCORE:   ${counter}`, 10, 50);
}
var button=document.getElementById('button');
button.addEventListener('click',()=>{
initialiser();
gameFrame=setInterval(setter,20);
gameCreate=setInterval(creation,2500)

});
function gameOver(){
  clearInterval(gameFrame);
  clearInterval(gameCreate);
  counter=0;
  updatecar.splice(1);
  setTimeout(()=>{
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle="green";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.font = "50px Arial";
    ctx.strokeText(`GAMEOVER`,10, 320);
    button.style.display='block';
  },500);
 
  
}

function keypress(){

document.addEventListener('keydown',e=>{
   if(e.keyCode==37 && player1.position!=1){
     player1.position--;

      }
   if(e.keyCode==39 && player1.position!=3){
     player1.position++;
   }
 
});
}
keypress();
function initialiser(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  button.style.display="none";
  ctx.moveTo(WIDTH/3,0);
  ctx.lineTo(WIDTH/3,HEIGHT);
  ctx.moveTo(2*(WIDTH/3),0);
  ctx.lineTo(2*(WIDTH/3),HEIGHT);
  ctx.setLineDash([10,15]);
  var backgroundSpeed=0;
  ctx.lineDashOffset=backgroundSpeed;
  ctx.strokeStyle="#fff";
  ctx.stroke();
}