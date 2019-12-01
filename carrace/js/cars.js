function randomInt(min,max){
    return Math.floor((Math.random()*(max-min))+min);
}

class Car{
    constructor (player){
        this.isplayer=player || false;
        this.height=60;
        this.width=60;
        this.y=(this.isplayer==='player')?HEIGHT-this.height:-20;
        this.speed=7;
        this.position=(this.isplayer=='player')?3: randomInt(1,4);
        this.health;
        this.lanewidth;
        this.draw();

    }
    draw(){
        this.lanewidth=WIDTH/3;
        if(this.isplayer=='player'){
            ctx.drawImage(CAR1,this.position* this.lanewidth-(this.lanewidth+this.width)/2,this.y);
            
   
           } 
        else{
           ctx.drawImage(CAR2,this.position* this.lanewidth-(this.lanewidth+this.width)/2,this.y);
        }
    }   
    move(counter){
        if(!this.isplayer){
        this.y=(counter<=10)?this.y+=this.speed: this.y+=this.speed+5;
        }
        }
    
    collision(playered){
    
        if ((this.position==playered.position) && (this.height+this.y>=HEIGHT-this.height)){
             gameOver();
        }
    }
 }
