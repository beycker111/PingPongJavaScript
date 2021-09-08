class Board {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.score = [0,0];
    }

    /**
     * Obtiene los elementos del tablero (Las barras y la pelota)
     */
    get elements(){
        var elements = this.bars.map(function (bar) {
            return bar;
        });
        elements.push(this.ball);
        return elements;
    }
}

export default Board;