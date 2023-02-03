const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let direction = null, PLAYER = null;

addEventListener("load", init)
addEventListener("adjust_can", adjust_can)

function adjust_can()
{
    canvas.width = 800
    canvas.height = 400
}

// player movment
addEventListener("keydown", e=>
{
    const key = e.key

    if(key == "ArrowRight")
        direction = 'R'
    if(key == "ArrowLeft")
        direction = 'L'
    if(key == "ArrowDown")
        direction = 'D'
    if(key == "ArrowUp")
        direction = 'U'

    PLAYER.update(direction)
})

function init()
{
    // adjust_can the canvas
    adjust_can()
 
    let width = 30
    let height = 30
    let position = {x: canvas.width/2 - width, y: canvas.height/2 + height}
    let color = "red"
    let velocity = 2

    PLAYER = new player(position, width,height, velocity, color, canvas)
    animate()
}

function animate()
{
    requestAnimationFrame(animate)
    
    ctx.fillStyle = "rgba(10, 10, 10, .1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    PLAYER.update(direction)
}

class player
{
    constructor(init_position, width, height, velocity, color, canvas)
    {
        this.position = init_position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(direction)
    {
        if(direction == 'L' && this.position.x >= 0)
            this.position.x -= this.velocity;
        if(direction == 'R' && this.position.x + this.width <= this.canvas.width) 
            this.position.x += this.velocity; 
        
        if(direction == 'U' && this.position.y >= 0)
            this.position.y -= this.velocity;
        if(direction == 'D' && this.position.y + this.height <= this.canvas.height)
            this.position.y += this.velocity;

        this.draw()
    }
}
