class BoardView{
    constructor(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    /**
     * Borra el rectangulo que estaba prevuamente dibujado por canvas
     */
    clean(){
        this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    }

    /**
     * Recorre cada elemento del tablero para posteriormente pintarlos a través del método draw()
     */
    drawAll(){
        for(var i = this.board.elements.length - 1; i>=0; i--){
            var el = this.board.elements[i];
            this.draw(this.ctx, el);
        }
    }

    /**
     * Pinta en el canvas un elemento
     * @param {*} ctx Parametro indispensable para poder pintar con canvas un elemento
     * @param {*} element Element del arreglo de elementos del tablero que se va a pintar en el canvas
     */
    draw(ctx, element){
        //if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
                case "circle":
                    ctx.beginPath();
                    ctx.arc(element.x, element.y, element.radius, 0, 7);
                    ctx.fill();
                    ctx.closePath();
                    break;
            }
        //}
        
    }

    /**
     * Permite ejecutar todos los métodos de la lógica y el funcionamiento del juego
     */
    play(){
        if(this.board.playing){
            this.clean();
            this.drawAll();
            this.check_collisions();
            this.check_point();
            this.board.ball.move();
        }
        
    }

    /**
     * Checkea si la pelota colisiona con las barras o con el borde superior e inferior del tablero
     */
    check_collisions(){
        for (var i = this.board.bars.length - 1; i >= 0; i--) {
            var bar = this.board.bars[i]
            if(this.hit(bar, this.board.ball)){
                this.board.ball.collision(bar);
            }else {
                this.board.ball.checkCollisionUpDown();
            }
        }
    }

    /**
     * Verifica si la pelota excede los border derecha e izquierda del tablero para asignarle el punto al jugador respectivo
     */
    check_point(){
        if(this.board.ball.x < 0){
            this.board.score[0] += 1;
            document.getElementById("puntajeder").innerHTML = this.board.score[0];
            alert("Punto para el jugador de la derecha");
            if(!this.win(this.board.score)){
                this.board.ball.x = 300;
                this.board.ball.y = 100;
                this.play();
            }
            
        }else if(this.board.ball.x > this.board.width){
            this.board.score[1] += 1;
            document.getElementById("puntajeizq").innerHTML = this.board.score[1];
            alert("Punto para el jugador de la izquierda");
            if(!this.win(this.board.score)){
                this.board.ball.x = 300;
                this.board.ball.y = 100;
                this.play();
            }
        }
    }

    /**
     * Verifica si se cumplen las condiciones para declarar a un jugador como ganador
     * @param {*} score Parametro que contiene un arreglo con el puntaje de los dos jugadores
     * @returns 
     */
    win(score){
        let result = false;
        if(score[0] === 5){
            result = true;
            alert("Gana el jugador de la izquierda");
            this.board.playing = false;
        }else if(score[1] === 5){
            result = true;
            alert("Gana el jugador de la derecha");
            this.board.playing = false;
        }
        
        return result;
    }

    /**
     * Verifica si una barra colisiona con la pelota
     * @param {*} a Elemento barra
     * @param {*} b Elemento pelota
     * @returns 
     */
    hit(a, b){
        //Revisa si a colisiona con b
        var hit = false;

        if(b.x + b.width >= a.x && b.x < a.x + a.width){
            if(b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }

        if(b.x <= a.x && b.x + b.width >= a.x + a.width){
            if(b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }

        if(a.x <= b.x && a.x + a.width >= b.x + b.width){
            if(a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }

        return hit;
    }

}

export default BoardView;