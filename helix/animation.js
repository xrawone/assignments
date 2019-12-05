class Animation{
    constructor(canvasId, width, height, rows, cols, colorArray){
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id',canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.rows = rows;
        this.cols = cols;
        this.colors = colorArray;
        this.generateballs = new BallGenerator(this.context, this.rows, this.cols, this.colors);
    }

  loop(){
        this.drawCanvas();
        requestAnimationFrame(this.loop.bind(this));
    }
    
    drawCanvas(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "black";
        this.context.fillRect(0 , 0, this.canvas.width, this.canvas.height);
       this.generateballs.draw();
    }
}


