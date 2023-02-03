const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

addEventListener("load", init)
addEventListener("adjust_can", adjust_can)

function adjust_can()
{
    canvas.width = 800
    canvas.height = 400
}

function init()
{
    // adjust_can the canvas
    adjust_can()
 
    let width = 30
    let height = 30
    let position = {x: canvas.width/2 - width, y: canvas.height/2 + height}
    let color = "red"
    let velocity = 2

    PLAYER = new player(position, width,height, velocity, color, ctx)

    PLAYER.update();
}

class player
{
    constructor(init_position, width, height, velocity, color, ctx)
    {
        this.position = init_position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
        this.ctx = ctx;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update()
    {
        this.draw()
    }
}