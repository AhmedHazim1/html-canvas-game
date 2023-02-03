const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let direction = null, PLAYER = null, PARTICLE;

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
    let player_position = {x: canvas.width/2 - width, y: canvas.height/2 + height}
    let player_color = "red"
    let velocity = 2

    let particle_color = "white"
    let raduis = 10

    // get a position where the x and y aren't outside the canvas
    let particle_position = {x: Math.random() * ((canvas.width - raduis) - raduis) + raduis,
                             y: Math.random() * ((canvas.height - raduis) - raduis) + raduis}

    PLAYER = new player(player_position, width, height, velocity, player_color, canvas)    
    PARTICLE = new particle(raduis, particle_position, particle_color, ctx)

    animate()
}

function animate()
{
    requestAnimationFrame(animate)

    ctx.fillStyle = "rgba(10, 10, 10, .5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    PARTICLE.update()
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
        this.ctx = canvas.getContext("2d");
    }

    draw()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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

class particle
{
    constructor(raduis, position, color, ctx)
    {
        this.raduis = raduis;
        this.position = position;
        this.color = color;
        this.ctx = ctx;
        this.hue = 0;
    }

    draw()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.position.x, this.position.y, this.raduis, 0, Math.PI * 2);
        this.ctx.fill()
    }
 
    update()
    {
        this.hue++;
        this.color = `hsl(${this.hue}, 70%, 70%)`

        this.draw()
    }
}
