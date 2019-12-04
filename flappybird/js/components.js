function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}


class Bird{
    constructor(){
        this.x=10;
        this.width=25;
        this.height=23.375;
        this.y=CANVAS_HEIGHT/2-this.height;
        this.index = 0;
        setInterval(() => {
            this.index ++;
            this.index %= 8;
        }, 100);
    }
    draw(){
        ctx.drawImage(BIRD, 0, this.index * 24.5, 25, 24.5, this.x, this.y, this.width, this.height);
    }
    motion(){
        this.y+=1.2*1.2;
        this.x+=0.1;
    }
}
class Obstacles{
    constructor(){
        this.x1=700;
        this.y1=0; 
        this.height1=getRandom(50,245);
        this.y2=this.height1+100;
        this.height2=CANVAS_HEIGHT-this.y2;
        this.width=40;

        this.draw();
    }
    draw(){
        ctx.drawImage(PIPEUP, this.x1,this.y1,this.width,this.height1);
        ctx.drawImage(PIPEDOWN,this.x1,this.y2,this.width,this.height2);

    }
    move(){
        this.x1-=1.2;
    }
    collision(bird){
        
        if(bird.x+bird.width>=this.x1+5 && bird.x<=this.x1+this.width && (bird.y<=this.y1+this.height1||bird.y+bird.height>=this.y2+5)||bird.y+bird.height-5>=CANVAS_HEIGHT-bg){
             
            gameOver();
        }
    }
}