
//game constants
let InputDir = {x:0,y:0} ;
const  foodSound= new Audio('tools/food.mp3');
const  moveSound = new Audio('tools/move.wav');
const  gameOverSound = new Audio('tools/game over.mp3');
const  musicSound = new Audio('tools/StartMusic2.wav');

let lastPaintTime = 0;
let speed=5;
let score=0;
let snakeArr=[
    {x:13,y:15}
];
 food={x:6,y:10};
 
//game function
function main(Ctime){
    window.requestAnimationFrame(main);

   // console.log(Ctime);
    if ((Ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }

    lastPaintTime = Ctime;
    gameEngine();
}
 //it becomes game loop


function isCollide(snake){
    //if snake bump itself
for(let i=1 ;i<snakeArr.length ;i++){
    if(snake[i].x===snake[0].x  &&  snake[i].y===snake[0].y){
        return true;
    }
}
    //it collide with bars
    if(snake[0].x >= 18 || snake[0].x <= 0  ||  snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

}
 function gameEngine(){
    //p1 : update snake arr n food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        InputDir={x:0,y:0} ;
        musicSound.play();
        alert("GAME OVER. press any key to play again");
        snakeArr=[{x:13,y:15}];
        // musicSound.play();
        score=0;
    }

    //if u have eaten the food increament score n regenerate it
if(snakeArr[0].x===food.x && snakeArr[0].y===food.y ){
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "score:"+score ;
    snakeArr.unshift({
        x:snakeArr[0].x + InputDir.x,
        y:snakeArr[0].y + InputDir.y  })  //this f will add new element to the start of snake

       //that food will be generated within the given grid
       let a=2;
       let b=16;
        food ={x:Math.round(a+(b-a)* Math.random()),    //now we again have to create food at any random pos
            y:Math.round(a+(b-a)* Math.random())}      //these r direct used method for regenration of food
     
    }

    //moving the snake                                                                          
    for(let i=snakeArr.length-2 ; i>=0; i--)//we kept prev part on its next part
    {
        
        snakeArr[i+1]= {...snakeArr[i]};
    }
    snakeArr[0].x += InputDir.x;
    snakeArr[0].y += InputDir.y;
    
    //p2 : 
    //display the snake 
    board.innerHTML = " ";
    snakeArr.forEach( (e,index) => {
        //we have to create here new lement
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);

    });

     //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
     board.appendChild(foodElement);

 }











//game logic
window.requestAnimationFrame(main);//when we r re-entering the animation code we should use it

//when key is pressed this event/function is called
window.addEventListener('keydown',e =>{
   InputDir={ x:10 , y:10};//start the game                     //here is the problem. it act as input to upkey.
                                                              //it should be (0,0)
                                                              
    moveSound.play();                                                                         

    switch (e.key) {
        case "ArrowUp":                                                           //not work
            console.log("ArrowUp");
            InputDir.x= 0;
            InputDir.y= -1;
            console.log(InputDir);  
            break;

        case "ArrowDown":
            console.log("ArrowDN");
            InputDir.x=0;
            InputDir.y= +1;
            break;

        case "ArrowRight":
            console.log("ArrowRT");
            InputDir.x= +1;
            InputDir.y=0;
                break;

        case "ArrowLeft":
            console.log("ArrowLT");
            InputDir.x= -1 ;
            InputDir.y=0;
                 break;
    
        default:
            break;
    }

    


})