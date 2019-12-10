const GAME_FRAME_RATE =18;

function Box(x, y, parentElem) {

    this.x = x;

    this.y = y;

    this.element = null;

    this.dx = Math.random()<0.5?2:-2

    this.parentElement = parentElem;

    this.dy = Math.random()<0.5?2:-2;

    

    this.init = function() {

      this.element = document.createElement('div');

      this.element.className = 'box';

      this.element.style.position="absolute";

      

      this.element.addEventListener('click',(e)=>

        e.target.style.display="none")

      this.parentElement.appendChild(this.element);

        return;

         }

    

    

    this.move = function() {

      this.x += this.dx;

      this.y += this.dy;

      this.boundaryCollision.bind(this);

    }

    this.boundaryCollision=function(){

        if(parseInt(this.x,10)>parseInt(appContainer.style.width,10)-parseInt(this.element.style.width,10)){

            this.dx*=-1; 

           this.x = parseInt(appContainer.style.width)-parseInt(this.element.style.width)
          console.log('boundarycollision',x+''+y);
          }

        if(parseInt(this.x)<=0 ){

              this.dx*=-1;

              this.x=0;
              console.log('boundarycollision',x+''+y);

        }

        if(parseInt(this.y,10)>parseInt(appContainer.style.height,10)-parseInt(this.element.style.height,10)){

            this.dy*=-1;

            this.y=parseInt(appContainer.style.height)-parseInt(this.element.style.height);
            console.log('boundarycollision',x+''+y);
        }

        if(parseInt(this.y)<=0){

            this.dy*=-1;

            this.y=0;
            console.log('boundarycollision',x+''+y);

        }   

     

    }

      this.draw = function() {

      this.element.style.top = this.y + 'px';

      this.element.style.left = this.x + 'px';

    }

    this.dimensions=function(){

        this.dimen=Math.floor(Math.random() * (Math.floor(45)-Math.ceil(25)) + Math.ceil(25) );

        this.element.style.width=this.dimen+ "px"; 

        this.element.style.height= this.dimen+ "px";

        this.boundaryCollision.bind(this);

    }

    

    this.setPosition = function(x, y) {

      this.x = x;

      this.y = y;

    }

    this.setColor=function(x,y,z){

        this.element.style.backgroundColor=`green`;

    }

 

  }

  

  function getRandomInt(min, max) {

    min = Math.ceil(min);

    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min; 

  }

  

  function GameAnimation(parentElement) {

    var boxes = [];

    this.parentElement = parentElement;

    

    this.init = function() {

     

      for(var i =1; i<=30;i++) {

        var box = new Box(getRandomInt(15,250), getRandomInt(15, 250), this.parentElement);

        box.init();

        box.dimensions();

        var collision;

        do{

            box.setPosition(getRandomInt(0,500), getRandomInt(0, 500));

            collision = false;

            for(var j = 0; j < boxes.length; j++){

                let boxB = boxes[j];

                let posX = (box.x + box.dimen/2) - (boxB.x + boxB.dimen/2);

                let posY = (box.y + box.dimen/2) - (boxB.y + boxB.dimen/2);

                
                let distance = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2)); 

                if(distance < (box.dimen + boxB.dimen) / 2 + 5){

                    collision = true;

                    break;

                }

            }

        }while(collision);

 

        box.draw();

       

        box.setColor(getRandomInt(0,254), getRandomInt(0, 254), getRandomInt(0, 254));

        boxes.push(box);        

       

      }

         

       setInterval(this.start.bind(this), GAME_FRAME_RATE)

    }

    

    this.start = function() { 

      boxes.forEach(function(box,index) {

        box.move();

        box.draw();

      

        box.boundaryCollision();



        boxes.forEach(function(boxB, indexB) {

            if(index == indexB){

                return;

            }

            let posX = (box.x + box.dimen/2) - (boxB.x + boxB.dimen/2);

            let posY = (box.y + box.dimen/2) - (boxB.y + boxB.dimen/2);

            let distance =(Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2))); 

            if(distance < (box.dimen + boxB.dimen) / 2){

                let tempX, tempY;

                tempX = box.dx;

                tempY = box.dy;

                box.dx = boxB.dx;

                box.dy = boxB.dy;

                boxB.dx = tempX;

                boxB.dy = tempY;

            }

        });

        

      });

     

  

    }

    

  }

  

  var appContainer = document.getElementById('app');

  appContainer.style.width=500+"px";

  appContainer.style.height=500+"px";

 


  

  new GameAnimation(appContainer).init();