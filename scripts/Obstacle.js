class Obstacle{
    constructor (game){
        this.game = game;
        this.posX = 250;
        this.posY = 0;
        this.width = 100;
        this.height = 100;
        this.xSpeed = 1;
        this.ySpeed = 1;
        this.direction = 'right';
        this.imageLook = false
    }

    runLogic (){
        this.posX += this.xSpeed;

        if (this.posX < 180) {
            this.xSpeed *= -1;
            this.direction = 'right';
        }
        else if(this.posX > 430){
            this.xSpeed *= -1;
            this.direction = 'left';
        }
    }

    paint (){
        const context = this.game.context;

        context.save();
        
        if(this.xSpeed < 0) {
            context.scale(-1, 1);
            context.drawImage(monster, -this.posX - this.width, this.posY, this.width, this.height);
        }
        else{
            context.drawImage(monster, this.posX, this.posY, this.width, this.height);
        }

        context.restore();
    }
}