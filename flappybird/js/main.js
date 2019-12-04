
let ctx=canvas.getContext('2d');
let init=0;


var animation;
var pipeCreation;
var highScore;
let counter;
document.addEventListener('click',game);
BACKGROUND.onload=()=>{
    ctx.drawImage(BACKGROUND,0,0,288,CANVAS_HEIGHT);
}
START.onload=()=>{
    ctx.drawImage(START,50,50,184,267);
}
function game(){
ctx.font=" 80px Flappy"
counter=0;
obs=[];
let speed=0.25;
ctx.drawImage(BACKGROUND,0,0,288,CANVAS_HEIGHT);
document.removeEventListener('click',game);
const bird=new Bird();
var obstacles;
obstacle1=new Obstacles();
obs.push(obstacle1);
ctx.drawImage(BASEGROUND,init,CANVAS_HEIGHT-bg,CANVAS_WIDTH,bg);
 pipeCreation=setInterval(creator,2000);
gameloop();
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(BACKGROUND,0,0,550,CANVAS_HEIGHT);
    //ctx.drawImage(BACKGROUND,293,0);
                
    bird.draw();
}
setInterval(()=>{bird.motion()},16.66);

function keypress(){
    document.addEventListener('keypress',e=>{
        if(e.keyCode==32 &&bird.x>0 &&bird.y>0){
         
             bird.y-=52;
           }
        else if(bird.x==0 && bird.y==0){
            bird.y=CANVAS_HEIGHT-bird.height;
        }
}) 
}
keypress(); 

function gameloop(){
    animation=window.requestAnimationFrame(gameloop);
  clearCanvas();
  for (i=obs.length-1;i>=0;i--){
       obs[i].move();
       obs[i].draw();
       ctx.drawImage(BASEGROUND,init,CANVAS_HEIGHT-bg,CANVAS_WIDTH,bg);
       ctx.drawImage(BASEGROUND,init+bgwidth,CANVAS_HEIGHT-bg,CANVAS_WIDTH, bg);
       ctx.fillStyle="#fff"
       ctx.fillText(counter, CANVAS_WIDTH/2-(obs[0].width)/2,CANVAS_HEIGHT/4);
       init=init-speed;
       if(init<-200){
           init=0;   
       }
       obs[i].collision(bird);
       if (obs[i].x1+obs[i].width<-10){
        obs.splice(obs,1);
        counter++;
      }
   }
 
  
}

function creator()
{
obstacles=new Obstacles();   
obs.push(obstacles);
}
}
function gameOver(){
    highScore=JSON.parse(localStorage.getItem('highScores')) || 0;
    if (counter>=highScore){
       localStorage.setItem('highScores',JSON.stringify(counter));
       highScore=counter;
    }

    clearInterval(pipeCreation);
    cancelAnimationFrame(animation);
    setTimeout(gameEnd,1000);
    
    
}
function gameEnd(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(BACKGROUND,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(RESTART,190,10,192,42);

    ctx.drawImage(SCOREBOARD,180,280,225,114);
    if (counter%10<=5){
    ctx.drawImage(BRONZE,67+143,325,40,40);
    }
    else if(counter%10>=5 && counter%10<=10){
    ctx.drawImage(SILVER,67+143,325,40,40);
    }
    else {
    ctx.drawImage(GOLD,67+143,320,40,40);
    }
    ctx.font="30px Arial"
    ctx.fillStyle="#fca048"
    ctx.fillText(counter,215+145,335);
    ctx.fillText(highScore,215+145,380);
    ctx.font="32px Flappy";
    ctx.fillStyle="#fff";
    ctx.fillText(`Click on the Screen`,200-20,440);
    ctx.fillText('to play again',230-20,470);
    document.addEventListener('click',game);
    }

