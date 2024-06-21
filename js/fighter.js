const gravity = 0.7;
class Fighter extends Sprite {
    constructor({position, 
                 velocity,
                 color,
                 imageSrc,
                 scale = 1,
                 frames = 1, 
                 offset = {x : 0, y : 0},
                 sprites,
                 attackBox = { offset:{}, width: undefined, height:undefined}}) {
        super({position, imageSrc, scale, frames, offset});
        this.position = position;
        this.velocity = velocity;
        this.height = 100;
        this.width = 70;
        this.lastKey = "";
        this.speed = 5;
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.isDead = false;
        this.attackBox = {
            position: {
                x: this.position.x + offset.x,
                y: this.position.y + offset.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.sprites = sprites;
        for(const sprite in sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
        console.log(sprites);
    }
    
    attack(){
        this.changeSprite('attack');
        this.isAttacking = true;
    }

    update(){
        this.draw();
        if(!this.isDead){
            super.changeFrame();
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        
        if(this.position.y + this.height + this.velocity.y >= floor){
            this.velocity.y = 0;
            this.position.y = floor - this.height;
        } else {
            this.velocity.y += gravity;
        }
    }

    takeHit(){
        this.health -= 20;
        if(this.health <= 0){
            this.changeSprite('death');
        } else {
            this.changeSprite('takeHit');
        }

    }

    changeSprite(sprite){
        // override animations
        if(this.image === this.sprites.death.image){
            if(this.frameCurrent == this.sprites.death.frames - 1){
                this.isDead = true;
            }
            return;
        }
        if(this.image === this.sprites.takeHit.image && this.frameCurrent < this.sprites.takeHit.frames - 1) return
        if(this.image === this.sprites.attack.image && this.frameCurrent < this.sprites.attack.frames - 1) return
        switch (sprite){
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image;
                    this.frames = this.sprites.run.frames;
                    this.frameCurrent = 0;
                }
            break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.frames = this.sprites.jump.frames;
                    this.frameCurrent = 0;
                }
            break
        
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    this.frames = this.sprites.idle.frames;
                    this.frameCurrent = 0;
                }
            break
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.frames = this.sprites.fall.frames;
                    this.frameCurrent = 0;
                }
            break
            case 'attack':
                if(this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image;
                    this.frames = this.sprites.attack.frames;
                    this.frameCurrent = 0;
                }
            break
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image;
                    this.frames = this.sprites.takeHit.frames;
                    this.frameCurrent = 1;
                }
            break
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image;
                    this.frames = this.sprites.death.frames;
                    this.frameCurrent = 0;
                }
            break
        }
    }

}