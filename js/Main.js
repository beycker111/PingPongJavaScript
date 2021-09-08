import Board from "./Board.js";
import BoardView from "./BoardView.js";
import Bar from "./Bar.js";
import Ball from "./Ball.js";

var board = new Board(800, 400);
var bar = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById('canvas');
var bar_2 = new Bar(20, 100, 40, 100, board);
var board_view = new BoardView(canvas, board);
var ball = new Ball(300, 100, 10, board);

document.addEventListener("keydown", function (ev) {
    
    console.log(ev.keyCode);
    if(ev.keyCode === 38){
        ev.preventDefault();
        bar.up();
    }else if(ev.keyCode === 40){
        ev.preventDefault();
        bar.down();
    }else if(ev.keyCode === 87){
        ev.preventDefault();
        bar_2.up();
    }else if(ev.keyCode === 83){
        ev.preventDefault();
        bar_2.down();
    }else if(ev.keyCode === 32){
        ev.preventDefault();
        board.playing = !board.playing;
    }

    console.log(bar.toString());
});

/**
 * Muestra las instrucciones del juego mediante un alert
 */
document.getElementById('instrucciones').onsubmit = function() { 
    alert("Para iniciar o pausar el juego presione la barra espaciadora\n"
        + "Utilice las teclas W y S para subir o bajar la barra del jugador del lado izquierdo del tablero.\n"
        + "Utilice las teclas ↑ y ↓ para subir o bajar la barra del jugador del lado derecho del tablero.\n"
        + "El jugador que logre pasar la pelota del lado opuesto del tablero acierta un punto.\n\n"
        + "Gana el jugador que acierte 5 puntos en total.");
    return false;
    
}
board_view.drawAll();

window.requestAnimationFrame(controller);

function controller(){
    
    board_view.play();
    window.requestAnimationFrame(controller);
}