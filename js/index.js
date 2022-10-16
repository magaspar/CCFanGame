const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight * 0.95

const gravity = 0.5
c.globalAlpha = 0
c.font = "48px mirza"


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
        this.imageRight2 = new Image();   
        this.imageLeft2 = new Image(); 
        this.sunset = new Image(); 
        this.imageRight.src = './img/omog.png';
        this.imageLeft.src = './img/omogleft.png';
        this.imageRight2.src = './img/omog2.png';
        this.imageLeft2.src = './img/omogleft2.png';
        this.sunset.src = './img/sunset.png';
        this.sprites = {
            stand: {
                right: this.imageRight,
                left: this.imageLeft,
                right2: this.imageRight2,
                left2: this.imageLeft2
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

class Npc {
    constructor() {
        this.position = {
            x: 1700,
            y: 120,
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
        this.text1 = new Image(); 
        this.text0 = new Image(); 
        this.imageRight.src = './img/Syko-critterRight.png';
        this.imageLeft.src = './img/Syko-critterLeft.png';
        this.text1.src = './img/text1.png';
        this.text0.src = './img/text0.png';
        this.sprites = {
            stand: {
                right: this.imageRight,
                left: this.imageLeft,
            },
        }
        this.currentSprite = this.sprites.stand.left
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
            x: 0,
            y: 720
        }
        this.width = 3000
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

class TextBox {
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
        c.drawImage(this.image, this.position.x, this.position.y, 300, 150)
    }
}























const player = new Player()
const platform = new Platform()
const npc = new Npc()
const textBox = new TextBox({
    image: npc.text1, 
    x: 700,
    y: 350
})
const textBox0 = new TextBox({
    image: npc.text0, 
    x: 300,
    y: 300
})

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
let scrollLevel = 0

let frame = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
  
    genericObject.draw()
    platform.draw()
    player.update()
    npc.update()
    
    //fade in

    if (c.globalAlpha < 1) {
        c.globalAlpha = c.globalAlpha + 0.00005
        if (c.globalAlpha > 0.1) {
            c.globalAlpha = c.globalAlpha + 0.002
        }
    }
    frame = frame + 1
    
    //animation player up down
    if (frame === 60 && !keys.right.pressed && !keys.left.pressed) {
        if (player.currentSprite == player.sprites.stand.right) {
            player.currentSprite = player.sprites.stand.right2
        }
        else if (player.currentSprite == player.sprites.stand.right2) {
            player.currentSprite = player.sprites.stand.right
        }
        else if (player.currentSprite == player.sprites.stand.left2) {
            player.currentSprite = player.sprites.stand.left
        }
        else {
            player.currentSprite = player.sprites.stand.left2
        }
        frame = 0
    } else if (frame == 60) {
        frame = 0
    }

    //scroll background and every object and player
    if(keys.right.pressed && player.position.x < 500) {
        player.velocity.x = 2.5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -2.5
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollLevel += 2.5
            if(scrollOffSet <= 1010) {
                scrollOffSet += 2.5
                
                genericObject.position.x -= 2.5
                platform.position.x -= 2.5
                npc.position.x -= 2.5
            }
        } else if (keys.left.pressed) {
            scrollLevel -=2.5
            if(scrollOffSet >= 3) {
                scrollOffSet -= 2.5
                
                platform.position.x += 2.5
                genericObject.position.x += 2.5
                npc.position.x += 2.5
            }
        }
        
    } 
    // console.log(scrollOffSet)
    if (player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
         && player.position.x + player.width >= platform.position.x
         && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0

    } 
    if (npc.position.y + npc.height <= platform.position.y 
        && npc.position.y + npc.height + npc.velocity.y >= platform.position.y 
         && npc.position.x + npc.width >= platform.position.x
         && npc.position.x <= platform.position.x + platform.width) {
        npc.velocity.y = 0
    } console.log(c.globalAlpha)
    if (scrollOffSet < 30 && c.globalAlpha >= 0.99) {
        textBox0.draw()
    }
    if (scrollOffSet > 1000) {
        textBox.draw()
        if(keys.right.pressed) {
            player.velocity.x = 2.5
        }
        if (scrollLevel > 1200 ) {
             if (c.globalAlpha >= -0.05) {
                c.globalAlpha = c.globalAlpha - 0.005
            }
        }
    }
    
}

animate()





















//keys event
window.addEventListener('keydown', ({keyCode}) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 83: 
            // console.log("left")
            player.currentSprite = player.sprites.stand.left
            keys.left.pressed = true
            break;
        case 69: 
            // console.log("up")
            player.velocity.y -= 10
            break;
        case 70: 
            //console.log("right")
            player.currentSprite = player.sprites.stand.right
            keys.right.pressed = true
            break;
        case 40: 
            //console.log("down")
            break;
    } 
})

window.addEventListener('keyup', ({keyCode}) => {
    console.log(keyCode)
    switch (keyCode) {
        case 83: 
            // console.log("left")
            keys.left.pressed = false
            break;
        case 69: 
            // console.log("up")
            break;
        case 70: 
            // console.log("right")
            keys.right.pressed = false
            break;
        case 40: 
            // console.log("down")
            break;
    } 
})