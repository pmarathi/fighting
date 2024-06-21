const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //context

canvas.width = 1024;
canvas.height = 576;
let floor = canvas.height - 70;

const background = new Sprite({position: {x : 0, y : 0 }, imageSrc:'../assets/background.png', scale: 1});

const player = new Fighter({
    position: {x : 100, y : 0},
    velocity: {x : 0, y : 0},
    offset: {x : 0, y : 0},
    color: 'blue',
    imageSrc: '../assets/Hero_Knight_2/Sprites/Idle.png',
    frames: 11,
    scale: 2.5,
    offset: {x:140, y: 107},

    sprites: {
        idle: {
            imageSrc: '../assets/Hero_Knight_2/Sprites/Idle.png',
            frames: 11,
        },
        run: {
            imageSrc: '../assets/Hero_Knight_2/Sprites/Run.png',
            frames: 8,
        },
        jump: {
            imageSrc: '../assets/Hero_Knight_2/Sprites/Jump.png',
            frames: 4
        },
        fall: {
            imageSrc: '../assets/Hero_Knight_2/Sprites/Fall.png',
            frames: 4
        },
        attack: {
            imageSrc: '../assets/Hero_Knight_2/Sprites/Attack.png',
            frames: 6
        },
        takeHit: {
            imageSrc: '../assets/Hero_Knight_2/Sprites/Take_Hit.png',
            frames: 4
        },
        death: {
            imageSrc: '../assets/Hero_Knight_2/Sprites/Death.png',
            frames: 9
        }
    },
    attackBox:{
        offset: {x: 50, y: 25},
        width: 110,
        height: 50
    }
});

const enemy = new Fighter({
    position: {x : 700, y : 0},
    velocity: {x : 0, y : 0},
    offset: {x : -50, y : 0},
    color: 'red',
    scale: 2.5, 
    offset: {x:140, y: 114},
    imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Idle.png',
    
    sprites: {
        idle: {
            imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Idle.png',
            frames: 10,
        },
        run: {
            imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Run.png',
            frames: 6,
        },
        jump: {
            imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Jump.png',
            frames: 2
        },
        fall: {
            imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Fall.png',
            frames: 2
        },
        attack: {
            imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Attack1.png',
            frames: 4
        },
        takeHit: {
            imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Get_Hit.png',
            frames: 3
        },
        death: {
            imageSrc: '../assets/Medieval_Warrior_Pack_3/Sprites/Death.png',
            frames: 9
        }
    },
    attackBox:{
        offset: {x: -110, y: 25},
        width: 120,
        height: 50
    }
});


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}


  
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    background.update();
    player.update();
    enemy.update();
    
    //player movement
    player.velocity.x = 0;
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -player.speed;
        player.changeSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = player.speed;
        player.changeSprite('run');
    } else {
        player.changeSprite('idle');
    }

    if(player.velocity.y < 0){
        player.changeSprite('jump')
    } else if (player.velocity.y > 0) {
        player.changeSprite('fall');
    }

    //enemy movement
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -enemy.speed;
        enemy.changeSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = enemy.speed;
        enemy.changeSprite('run');
    } else {
        enemy.changeSprite('idle');
    }

    if(enemy.velocity.y < 0){
        enemy.changeSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.changeSprite('fall');
    }

    // check for collision
    if(rectangularCollision({rectangle1: player, rectangle2: enemy}) &&
        player.isAttacking && player.frameCurrent === 4
    ){
        player.isAttacking = false;
        enemy.takeHit();
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        gsap.to('#enemyHealth', {width: enemy.health + '%'});
    }

    //player misses
    if(player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false;
    }

    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) &&
        enemy.isAttacking && enemy.frameCurrent === 2
    ){
        enemy.isAttacking = false;
        player.takeHit();
        // document.querySelector('#playerHealth').style.width = player.health + '%';
        gsap.to('#playerHealth', {width: player.health + '%'});
    }

    //enemy misses
    if(enemy.isAttacking && enemy.frameCurrent === 2){
        enemy.isAttacking = false;
    }

    // end game based on health
    if(enemy.health === 0 || player.health === 0){
        displayWinner(timerId);
    }
}

window.addEventListener('keydown', (event) =>{
    if(!player.isDead){
    switch(event.key){
        case 'w':
            if(player.position.y + player.height + player.velocity.y >= floor){
                player.velocity.y = -20;
            }
        break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
        break
        case 's':

        break
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
        break
        case 'q':
            player.attack();
        break
        }
    }
    if(!enemy.isDead){
        switch(event.key){
            case 'ArrowUp':
                if(enemy.position.y + enemy.height + enemy.velocity.y >= floor){
                    enemy.velocity.y = -20;
                }
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
            break
            case 'ArrowDown':

            break
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
            break
            case '.':
                enemy.attack()
        }
    }
});
window.addEventListener('keyup', (event) =>{
    switch(event.key){
        //player
        case 'w':

        break
        case 'a':
            keys.a.pressed = false;
        break
        case 's':

        break
        case 'd':
            keys.d.pressed = false;
        break
        //enemy
        case 'ArrowUp':
            
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        case 'ArrowDown':

        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break
    }
});

decreaseTimer();
animate();