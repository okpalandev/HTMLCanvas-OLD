import { createBoard, createMachine } from './utils/index.js';
import { drawBoard, drawO, drawX } from './utils/index.js';
import { isGameOver, isWin } from './utils/index.js'; 

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 800;

const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      transitions: {
        start: 'start',
      },
    },
    start: {
      transitions: {
        play: 'playing',
        pause : 'stop',
      },
    },
    pause : {
      transitions: {
        play: 'playing',
        restart: 'start',
      },
    },
    stop: {
      transitions: {
        restart: 'start',
      },
    },
   
    playing: {
      transitions: {
        move: 'playing',
        win: 'win',
        draw: 'draw',
      },
    },
    win: {
      transitions: {
        restart: 'start',
      },
    },
    draw: {
      transitions: {
        restart: 'start',
      },
    },
  },
});

let board = createBoard(ctx);
let currentPlayer = 'X'; // Start with player X

machine.on('idle', function () {
  machine.dispatch('start');
});

machine.on('start', function () {
  machine.dispatch('play');
});

machine.on('playing', function () {
  if (isGameOver(board)) {
    machine.dispatch('draw');
  };

  if (isWin(board, 'X')) {
    machine.dispatch('win');
  };

});

machine.on('win', function () {
  drawBoard(ctx,board);
  ctx.font = '48px serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`${currentPlayer} wins!`, WIDTH/2 , HEIGHT / 2);
  setTimeout(() => {
    machine.dispatch('restart');
  }, 3000);
});

machine.on('draw', function () {
  ctx.font = '48px serif';
  ctx.fillStyle = 'black';
  ctx.fillText('Draw', WIDTH/2 , HEIGHT / 2);
  setTimeout(() => {
    machine.dispatch('restart');
  }, 3000);
});

function init() {
  canvas.addEventListener('click', function (event) {
    if (machine.state === 'playing') {
      let x = event.clientX - canvas.offsetLeft;
      let y = event.clientY - canvas.offsetTop;
      let row = Math.floor(y / 200);
      let col = Math.floor(x / 200);
      if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        drawBoard(ctx, board);
        if (currentPlayer === 'X') {
          currentPlayer = 'O'; // Switch to player O
        } else {
          currentPlayer = 'X'; // Switch to player X
        }
        machine.dispatch('move');
      }
    }
  });
  

}



init();
