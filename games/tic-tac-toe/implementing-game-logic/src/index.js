import { createBoard, drawBoard, drawO, drawX } from './utils/index.js';

const canvas = document.getElementById('tic-tac-toe');
const ctx = canvas.getContext('2d');

const machine = createMachine({
    initial: 'idle', // preloaded state and demonstrattion of ai.
    states: {
      idle : {
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

console.log(machine.state);
