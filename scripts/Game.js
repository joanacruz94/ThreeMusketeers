class Game{
    constructor($canvas){
        this.$canvas = $canvas;
        this.context = this.$canvas.getContext('2d');
        this.character = new Character(this);
        this.level = new LevelTwo(this);
    }

    startGame (){
        this.level.loop();
    }
}