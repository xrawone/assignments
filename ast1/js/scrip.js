const Pictures = 500;

const HOLD = 3000;

calculateMargin = (number) => number*Pictures;





var imageArray = document.getElementsByTagName("img");

var totalImageCount = imageArray.length;

var PictureImaged = document.getElementsByClassName("carousel-container");

var imageWrapper = document.getElementsByClassName("carousel-image-wrapper");

var dots = document.getElementsByClassName("dot"); 



var leftPart = document.createElement("div");

leftPart.setAttribute("id","slider-left");

leftPart.style.position = "absolute";

leftPart.style.left = 0+"px";

leftPart.style.height = 30+"px";

leftPart.style.width = 30+"px";

leftPart.style.top = 140+"px";

leftPart.style.backgroundColor = "rgb(255,255,255,0.8)";

leftPart.style.backgroundImage = "url(./images/left-arrow.png)";

leftPart.style.backgroundRepeat= "none";



PictureImaged[0].appendChild(leftPart);





var rightPart = document.createElement("div");

rightPart.setAttribute("id","slider-right");

rightPart.style.position = "absolute";

rightPart.style.right = 0+"px";

rightPart.style.height = 30+"px";

rightPart.style.width = 30+"px";

rightPart.style.top = 140+"px";

rightPart.style.backgroundColor = "rgb(255,255,255,0.8)";

rightPart.style.backgroundImage = "url(./images/right-arrow.png)";

rightPart.style.backgroundRepeat= "none";



PictureImaged[0].appendChild(rightPart);





for(var i=0;i<totalImageCount;++i){

    let nav = document.createElement("button");

 

    nav.onclick = function(e){

       var index = e.target.getAttribute('value');

       transition(parseInt(index));

       currentIndex = index;

    }

    nav.setAttribute("value",i);

    console.log(nav.getAttribute("value"));

    PictureImaged[0].appendChild(nav);

}


var leftMargin = 0;







var currentIndex = 0;

var nextIndex;

var difference;







setInterval(function(){

    nextIndex = (currentIndex+1) % totalImageCount;

    transition(nextIndex);

    currentIndex = nextIndex;

},3000)



function transition(nextIndex){

    present = calculateMargin(currentIndex);

   
    console.log(currentIndex,nextIndex)

    targetedMargin = calculateMargin(nextIndex);

    difference = targetedMargin - present;

    speed = 0.02;

    rate = 0;
  

   
    animator = setInterval(function(){

        imageWrapper[0].style.marginLeft = -(present+difference*rate)+"px";

        rate += speed;

        if (rate > 1){

            imageWrapper[0].style.marginLeft = -calculateMargin(nextIndex)+"px";

            clearInterval(animator);

        }
        changedots(nextIndex);
    },1)

}

function changedots(nextIndex)
{
    var i;
    for (i = 0; i < dots.length; i++) { 
        dots[i].className = dots[i].className. 
                            replace(" active", ""); 
    } 
    
    
    dots[nextIndex].className += " active";
    
   

}



leftPart.addEventListener('click', () => {

    if(currentIndex > 0){

        imageWrapper[0].style.marginLeft = transition(currentIndex-1);

        console.log(currentIndex,nextIndex);

        currentIndex -= 1; 

    }

});



rightPart.addEventListener("click",()=>{

    if(currentIndex < totalImageCount-1 && currentIndex >=0){

      

        imageWrapper[0].style.marginLeft = transition(currentIndex+1);

        currentIndex += 1;

       

    }

})