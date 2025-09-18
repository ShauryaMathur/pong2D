import { GAME_WIDTH, GAME_HEIGHT,BALL_RADIUS,BALL_SPEED } from "./constants.js";

export class Ball{
    constructor(ctx,xDirection,yDirection,color,borderColor){
        this.ctx = ctx;
        this.x = GAME_WIDTH/2;
        this.y = GAME_HEIGHT/2;
        this.radius = BALL_RADIUS;
        this.speed = BALL_SPEED;
        this.xDirection = xDirection;
        this.yDirection = yDirection;
        this.color = color;
        this.borderColor = borderColor
    }

    startInitialMovement(){
        this.xDirection = Math.round(Math.random()) == 1 ? 1 : -1;
        this.yDirection = Math.round(Math.random()) == 1 ? Math.random()*1 : Math.random()*-1;
    }

    move(){
        this.x += this.speed * this.xDirection;
        this.y += this.speed * this.yDirection;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
    }
    
}