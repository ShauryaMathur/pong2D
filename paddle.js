export class Paddle{
    constructor(ctx,x, y, width, height,speed,color,borderColor) {
        this.ctx = ctx
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.score = 0
        this.speed = speed
        this.color = color
        this.borderColor = borderColor
    }

    draw(){
        this.ctx.strokeStyle = this.borderColor
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp(){
        this.y -= this.speed
    }

    moveDown(){
        this.y += this.speed
    }
}