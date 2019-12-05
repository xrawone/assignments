class BallGenerator{
    constructor(context, noOfRows, noOfCols, colorArray){
        this.context = context;
        this.noOfRows = noOfRows;
        this.noOfCols = noOfCols;
        this.colors = colorArray;
        this.initialCenter = {
            x : 100,
            y : 60
        }
        this.gap = 20;
        this.balls = [];
        this.update();
    }

    draw(){
        for(let i = 0; i < this.balls.length; i++){
            this.balls[i].update();
            this.balls[i].draw();
        }
    }

    create(isOutOfPhase){


        let currentPosY = this.initialCenter.y;

        for(let i = 0; i < this.noOfRows; i++){
            currentPosY += this.gap;

            let currentPoxX = 0;
            let phaseIncrease = 6;
            let currentPhase = 0;

            for(let j = 0; j < this.noOfCols; j++){
                let ball = new Ball(this.context, this.colors[i%this.colors.length], isOutOfPhase);

                ball.center.x = currentPoxX += this.gap;
                ball.center.y = currentPosY;
                ball.currentX = currentPhase += phaseIncrease;
                ball.currentY = currentPosY;

                this.balls.push(ball);
            }
        }
    }
    update(){
        this.create(false);
        this.create(true);
    }


}