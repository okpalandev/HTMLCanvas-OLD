import { createBoard, createMachine } from './utils/index.js';
import { drawBoard, drawO, drawX } from './utils/index.js';

const canvas = document.getElementById('tic-tac-toe');
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
  ctx.fillText('You win!', WIDTH/2 , HEIGHT / 2);
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

let players = document.getElementsByClassName('player');
let player = side(players[Math.random() > .5 ? 0 : 1]) === 'X' ? 'X' : 'O';
let ai = player === 'X' ? 'O' : 'X';

let currentPlayer = player;

function init() {
  let isInactive = false;
  let timeoutId = setTimeout(() => {
    isInactive = true;
    machine.dispatch('idle'); // Change 'start' to 'idle'
  }, 5000);

  canvas.addEventListener('click', function (event) {
    if (isInactive) {
      isInactive = false;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isInactive = true;
        machine.dispatch('idle');
      }, 5000);
    }

    if (machine.state === 'playing') {
      let x = event.clientX - canvas.offsetLeft;
      let y = event.clientY - canvas.offsetTop;
      let row = Math.floor(y / 200);
      let col = Math.floor(x / 200);
      if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        drawBoard(ctx, board);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        machine.dispatch('move');
      }
    }
  } );

console.log('player:', player); 
  if (!!timeoutId) {
    clearTimeout(timeoutId);
  }
}
function side(element = document.querySelector('.player')) {
    return element.innerText.trim();
}

init();
