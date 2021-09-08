class BoardView{
    constructor(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    clean(){
        this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    }

    drawAll(){
        //console.log(this.board.elements.length);
        for(var i = this.board.elements.length - 1; i>=0; i--){
            //console.log(this.board.elements[i]);
            var el = this.board.elements[i];
            this.draw(this.ctx, el);
        }
    }

    draw(ctx, element){
        //Este if me pone problema de momento
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

    play(){
        if(this.board.playing){
            this.clean();
            this.drawAll();
            this.check_collisions();
            this.board.ball.move();
        }
        
    }

    check_collisions(){
        for (var i = this.board.bars.length - 1; i >= 0; i--) {
            var bar = this.board.bars[i]
            if(this.hit(bar, this.board.ball)){
                this.board.ball.collision(bar);
            }
        }
    }

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