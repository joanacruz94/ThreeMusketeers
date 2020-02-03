class Character{
	constructor(game){
        this.game = game;
        this.width = 80;
        this.height = 80;
	    this.delay = 0;
		this.posX = this.game.$canvas.width/2 - this.width/2;
		this.posY = this.game.$canvas.height - this.height;
		this.prevX = 0;
		this.speed = 4,
		this.jumpSpeed = 17;
		this.jumping = false;
		this.airTime = 0;
		this.velocity= 0.05;
		this.velocityUp = 0;
        this.velocityDown = 0;
        this.direction = 'right';
        this.image = characterPaused;
    }
    
    moveRight (){
        this.direction = 'right';
        this.posX += this.speed * this.velocity;                        
    }

    moveLeft (){
        this.direction = 'left';
        this.posX -= this.speed * this.velocity;
    }

    runLogic (){			
		// record old position
        this.prevX = this.posX;

		// don't fall of screen
		if (this.posY + this.height >= this.game.$canvas.height) {
            this.jumping = false;
            this.posY = this.game.$canvas.height - this.height;
            this.velocityDown = 0;
		}
        
        // player presses up to jump
        if (!this.jumping && keys.up in keysDown && this.velocityDown <= 0) { 
            this.velocityUp = this.jumpSpeed/2;
            this.velocityDown = 0;
            this.jumping = true;
            this.airTime = 0;
        }
        // jump higher if held longer
        else if (this.jumping && this.airTime > 1 && this.airTime < 12 && keys.up in keysDown) {
            this.velocityUp += 1;
        }
        // fall faster if jump isn't as strong
        else if (this.jumping && this.velocityUp > 0 && this.airTime < 50) {
            this.velocityUp -= 2;
        }
        // update gravity
        else {
            if (this.velocityUp > 0){
                this.velocityUp--;
            }
            else if (this.velocityDown < this.jumpSpeed){
                this.velocityDown += gravitySpeed;
            }
        }
        		
        if (this.posX > 0 && keys.left in keysDown) { 
            this.moveLeft();
        }

        if (this.posX + this.width < this.game.$canvas.width && keys.right in keysDown) { 
            this.moveRight();
        }

        // update running velocity
        if ((keys.left in keysDown && this.prevX > this.posX) || (keys.right in keysDown && this.prevX < this.posX)){
            this.velocity += 0.05;
            this.image = characterRunning;
        }
        else{
            this.velocity = 0.05;
            this.image = characterPaused;
        }

        // cap velocity at 1
        if (this.velocity > 1)
            this.velocity = 1;
			
        // final jump
        if (this.velocityUp > 0)
            this.posY = this.posY - this.velocityUp;
        // final fall
        else if (this.velocityUp < 1) {
            this.posY = this.posY + this.velocityDown;
        }

        // update time in air when jumping
        if (this.jumping)
            this.airTime++;
        }
        
    paint (){
        const context = this.game.context;

        context.save();
        
        if(this.direction === 'right')
            context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        else if(this.direction === 'left'){
            context.scale(-1, 1);
            context.drawImage(this.image, -this.posX, this.posY, this.width, this.height);
        }
        context.restore();
    }
	}






    



    