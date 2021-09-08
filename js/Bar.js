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

    /**
     * Cambia la cordenada en y de la barra para moverla hacia abajo
     */
    down() {
        this.y += this.speed;
        this.comprobarLimitesBarra();
    }

    /**
     * Cambia la cordenada en y de la barra para moverla hacia arriba
     */
    up() {
        this.y -= this.speed;
        this.comprobarLimitesBarra();
    }

    /**
     * Comprueba la posición actual de la barra para que esta no exceda los limiites superior e inferior del tablero
     */
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