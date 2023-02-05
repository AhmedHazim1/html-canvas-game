const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let direction = null, PLAYER = null, PARTICLE;
let score = 0;
let score_text = document.querySelector("#score");

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

    PLAYER = new player(player_position, width, height, velocity, player_color, canvas, ctx)
    PARTICLE = create_particle()
    animate()
}

function animate()
{
    requestAnimationFrame(animate)

    ctx.fillStyle = "rgba(10, 10, 10, .1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    if (Math.hypot((PLAYER.position.x + PLAYER.width/2) - PARTICLE.position.x, (PLAYER.position.y + PLAYER.height/2) - PARTICLE.position.y) <= 30
    || PARTICLE.position.x > canvas.width || PARTICLE.position.x < 0 || PARTICLE.position.y > canvas.height || PARTICLE.position.y < 0)
    {
        score++;
        score_text.textContent = score;
        PLAYER.color = PARTICLE.color;
        PARTICLE = create_particle()
    }

    PARTICLE.update()
    PLAYER.update(direction)
}

function create_particle()
{
    let particle_color = "white"
    let raduis = 10

    // get a position where the x and y aren't outside the canvas
    let particle_position = {x: Math.floor(Math.random() * ((canvas.width - raduis) - raduis) + raduis),
                             y: Math.floor(Math.random() * ((canvas.height - raduis) - raduis) + raduis)}
    return new particle(raduis, particle_position, particle_color, ctx)
}

class player
{
    constructor(init_position, width, height, velocity, color, canvas, ctx)
    {
        this.position = init_position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw()
    {
        this.ctx.beginPath()
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
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.position.x, this.position.y, this.raduis, 0, Math.PI * 2);
        this.ctx.fill()
    }
 
    update()
    {
        this.hue++;
        this.color = `hsl(${this.hue}, 100%, 70%)`

        this.position.x += Math.random() < .5 ? Math.random() : -Math.random();
        this.position.y += Math.random() < .5 ? Math.random() : -Math.random();
        this.draw()
    }
}
