import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";

const gameContainer = document.getElementById('gameContainer');
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const scoreText = document.getElementById('scoreText');
const resetButton = document.getElementById('resetButton');

const gameWidth = GAME_WIDTH;
const gameHeight = GAME_HEIGHT;

let paddle1 = new Paddle(ctx,0,0,25,100,0,50,"lightblue");
let paddle2 = new Paddle(ctx,gameWidth-25,gameHeight-100,25,100,0,50,"red");

let ball = new Ball(ctx,12.5,1,0,0,"yellow","black");

let gameInMotion = false;

function changeDirection(event){
    const {key,keyCode} = event;
    console.log(event.keyCode);
    if(key === "ArrowUp"){
        if(paddle2.y > 0){
            paddle2.moveUp();
        }
    }
    if(key === "ArrowDown"){
        if(paddle2.y < gameHeight - paddle2.height){
            paddle2.moveDown();
        }   
    }
    if(key === "w"){
        if(paddle1.y > 0){
            paddle1.moveUp();
        }
    }
    if(key === "s"){
        if(paddle1.y < gameHeight - paddle1.height){
            paddle1.moveDown();
        }
    }

    if(keyCode === 32 && !gameInMotion){
        ball.startInitialMovement();
        gameInMotion = true;
    }
}

function checkCollisions(){
    if(ball.y <= 0 + ball.radius){
        ball.yDirection *= -1;
    }
    if(ball.y >= gameHeight - ball.radius){
        ball.yDirection *= -1;
    }
    if(ball.x <= 0 + ball.radius){
        paddle2.score += 1;
        // ball.startInitialMovement();
        updateScore();
        ball = new Ball(ctx,12.5,1,0,0,"yellow","black");
        gameInMotion = false;
        return;
    }
    if(ball.x >= gameWidth - ball.radius){
        paddle1.score += 1;
        updateScore();
        // ball.startInitialMovement();
        ball = new Ball(ctx,12.5,1,0,0,"yellow","black");
        gameInMotion = false;
        return;
    }

    if(ball.x <= (paddle1.x + paddle1.width + ball.radius)){
        if(ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height){
            ball.x = (paddle1.x + paddle1.width + ball.radius);
            ball.xDirection *= -1;
            ball.speed += 0.2;
        }
    }
    if(ball.x >= (paddle2.x - ball.radius)){
        if(ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height){
            ball.x = paddle2.x - ball.radius;
            ball.xDirection *= -1;
            ball.speed += 0.2;
        }
    }
}

function updateScore(){
    scoreText.innerText = `${paddle1.score} : ${paddle2.score}`
}


window.addEventListener("keydown", changeDirection);
// resetButton.addEventListener("click",resetGame);

function gameLoop(){
    console.log("loop");
    ctx.clearRect(0,0,gameWidth,gameHeight);
    paddle1.draw();
    paddle2.draw();
    ball.move();
    ball.draw();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}
gameLoop();



