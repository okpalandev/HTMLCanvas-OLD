import { createBoard, drawBoard, drawO, drawX } from './utils/index.js';

const canvas = document.getElementById('tic-tac-toe');
const ctx = canvas.getContext('2d');
const board = createBoard(ctx); // Pass the context to createBoard

const machine = createMachine({
    initial: 'start',
    states: {
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

machine.on('transition', (state) => {
    if (state === 'playing') {
        drawBoard(ctx, board);
    }
    }
);

machine.dispatch('play');
