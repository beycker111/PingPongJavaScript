class Bar{
    constructor(x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;

        this.board.bars.push(this);

        this.kind = "rectangle";
        this.speed = 10;
    }

    down() {
        this.y += this.speed;
        this.comprobarLimitesBarra();
    }

    up() {
        this.y -= this.speed;
        this.comprobarLimitesBarra();
    }

    comprobarLimitesBarra(){
        if(this.y < 0){
            this.y = 0;
        }else if(this.y > (this.board.height - this.height)){
            this.y = (this.board.height - this.height);
        }
    }

    toString(){
        return "x: " + this.x + " y: " + this.y;
    }
}

export default Bar;