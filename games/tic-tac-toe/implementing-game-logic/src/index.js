// Import necessary functions and createMachine from './utils'
import { createMachine } from './utils/state-machine.js';
import { startTimer, pauseTimer, resumeTimer } from './utils/timer.js';
import { drawOverlay, drawWinningLine, createBoard, clearCanvas } from './utils/board.js';
import { isWin, isBoardFull ,getWinningCells } from './utils/game-processing.js';

// Get the canvas element and its 2d rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 800;

// Initialize variables
let currentPlayer = 'X'; // Start with player X
let gameStarted = false; // Flag to track if the game has started
let board; // Declare the board variable

// Define the state machine
const machine = createMachine({
  // Define initial state
  initial: 'idle',
  states: {
    idle: {
      transitions: {
        start: 'start',
        stop: 'stop',
      },
    },
    start: {
      transitions: {
        play: 'playing',
        pause: 'pause',
        stop: 'stop',
      },
      onEnter: function() {
        startTimer();
        drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
      },
      onExit: function() {
        clearCanvas(ctx);
      }
    },
    pause: {
      transitions: {
        play: 'playing',
        stop: 'stop',
      },
    },
    stop: {
      transitions: {
        restart: 'start',
      },
      onEnter: function() {
        pauseTimer();
        resetGame();
      },
    },
    playing: {
      transitions: {
        move: 'playing',
        win: 'win',
        draw: 'draw',
        pause: 'pause',
      },
    },
    win: {
      transitions: {
        stop: 'stop',
      },
      onEnter: function() {
        pauseTimer();
        const winningCells = getWinningCells(board, currentPlayer);
        drawWinningLine(ctx, winningCells);
      },
    },
    draw: {
      transitions: {
        restart: 'start',
      },
      onEnter: function() {
        pauseTimer();
      },
    },
  },
});

// Event listener for the pause-play button
const ppBtn = document.getElementById('pause-play');
ppBtn.addEventListener('click', function () {
  if (machine.state === 'playing') {
    pauseTimer();
    ppBtn.textContent = 'Resume';
  } else if (machine.state === 'pause') {
    resumeTimer();
    ppBtn.textContent = 'Pause';
  }
});

// Event listener for the stop-start button
const ssBtn = document.getElementById('stop-start');
ssBtn.addEventListener('click', function () {
  if (machine.state === 'playing' || machine.state === 'pause') {
    machine.dispatch('stop');
  } else if (machine.state === 'idle') {
    machine.dispatch('start');
  }
});

// Add a click event listener to the canvas for making moves
canvas.addEventListener('click', function (event) {
  if (!gameStarted) {
    return;
  }

  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;

  let row = Math.floor(y / (HEIGHT / 3));
  let col = Math.floor(x / (WIDTH / 3));

  if (board[row][col] === '') {
    if (currentPlayer === 'X') {
      drawX(ctx, row, col);
      board[row][col] = 'X';
    } else {
      drawO(ctx, row, col);
      board[row][col] = 'O';
    }

    if (isWin(board, currentPlayer)) {
      machine.dispatch('win');
    } else if (isBoardFull(board)) {
      machine.dispatch('draw');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      machine.dispatch('move');
    }
  }
});

// Function to reset the game
function resetGame() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  board = createBoard(ctx);
  currentPlayer = 'X';
  drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
}


// Listen for state transitions
machine.on('transition', function (state) {
  console.log('Transition:', state);
  switch (state) {
    case 'playing':
      ppBtn.textContent = 'Pause';
      ssBtn.textContent = 'Stop';
      gameStarted = true;
      break;
    case 'pause':
      ppBtn.textContent = 'Resume';
      ssBtn.textContent = 'Stop';
      break;
    case 'idle':
      ppBtn.textContent = 'PAUSE';
      ssBtn.textContent = 'STOP';
      gameStarted = false;
      break;
    case 'win':
    case 'draw':
      ppBtn.textContent = 'Pause';
      ssBtn.textContent = 'Restart';
      gameStarted = false;
      break;
    case 'stop':
      resetGame();
      ppBtn.textContent = 'Pause';
      ssBtn.textContent = 'Start';
      gameStarted = false;
      break;
      
  };
});


// Function to initialize the game
function init() {
  board = createBoard(ctx);
  drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
}

// Call the init function to start the game
init();
