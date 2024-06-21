class Sprite {
    constructor({position, imageSrc, scale, frames = 1, offset = {x : 0, y : 0}}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frames = frames;
        this.frameCurrent = 1; 
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
    }

    draw(){
       c.drawImage(this.image,
                   this.frameCurrent * (this.image.width / this.frames),
                   0,
                   this.image.width / this.frames,
                   this.image.height,   
                   this.position.x - this.offset.x, 
                   this.position.y - this.offset.y, 
                   (this.image.width / this.frames) * this.scale, 
                   this.image.height * this.scale);
    }
    
    update(){
        this.draw();
        this.changeFrame();
    }
    
    changeFrame(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.frameCurrent < this.frames - 1){
                this.frameCurrent++;
            } else {
                this.frameCurrent = 0;
            }
        }
    }

}