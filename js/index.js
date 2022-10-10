const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720

const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 250
        this.height = 250
        this.imageRight = new Image();   
        this.imageLeft = new Image();   
        this.sunset = new Image(); 
        this.imageRight.src = './img/omog.png';
        this.imageLeft.src = './img/omogleft.png';
        this.sunset.src = './img/1119.png';
        this.sprites = {
            stand: {
                right: this.imageRight,
                left: this.imageLeft
            },
        }
        this.currentSprite = this.sprites.stand.right
    }
    draw() {
        c.drawImage(this.currentSprite, this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor() {
        this.position = {
            x: 300,
            y: 400
        }
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platform = new Platform()
const genericObject = new GenericObject({
    x: 0,
    y: 50,
    image: player.sunset
})

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}



player.update()
let scrollOffSet = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    genericObject.draw()
    platform.draw()
    player.update()
    
    

    if(keys.right.pressed && player.position.x < 500) {
        player.velocity.x = 3
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -3
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            
            if(scrollOffSet <= 700) {
                scrollOffSet += 3
                genericObject.position.x -= 3
                platform.position.x -= 3
            }
        } else if (keys.left.pressed) {
            
            if(scrollOffSet >= 3) {
                scrollOffSet -= 3
                genericObject.position.x += 3
                platform.position.x += 3
            }
        }
        if (scrollOffSet > 700) {
            console.log("win")
        }
    } 
    console.log(scrollOffSet)
    if (player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
         && player.position.x + player.width >= platform.position.x
         && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0
    } 
}

animate()

window.addEventListener('keydown', ({keyCode}) => {
    console.log(keyCode)
    switch (keyCode) {
        case 37: 
            console.log("left")
            player.currentSprite = player.sprites.stand.left
            keys.left.pressed = true
            break;
        case 38: 
            console.log("up")
            player.velocity.y -= 20
            break;
        case 39: 
            console.log("right")
            player.currentSprite = player.sprites.stand.right
            keys.right.pressed = true
            break;
        case 40: 
            console.log("down")
            break;
    } 
})

window.addEventListener('keyup', ({keyCode}) => {
    console.log(keyCode)
    switch (keyCode) {
        case 37: 
            console.log("left")
            keys.left.pressed = false
            break;
        case 38: 
            console.log("up")
            break;
        case 39: 
            console.log("right")
            keys.right.pressed = false
            break;
        case 40: 
            console.log("down")
            break;
    } 
})