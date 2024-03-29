// Import necessary functions and createMachine from './utils'
import { createMachine } from './utils/state-machine.js';
import { startTimer, pauseTimer, resumeTimer, resetTimer } from './utils/timer.js';
import { drawOverlay, drawWinningLine, createBoard, clearCanvas, drawX, drawO, drawBoard } from './utils/board.js';
import { isWin, isBoardFull, getWinningCells } from './utils/game-processing.js';

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

const machine = createMachine({

  // Define initial state
  initial: 'start', // Initial state is 'start'
  states: {
    start: {
      transitions: {
        select: 'select', // Transition to 'select' state to select player character
      },
      onEnter: function() {
        init(); // Call the init function to start the game
      }
    },
    select: {
      transitions: {
        play: 'playing', // Transition to 'playing' state to start the game
      },
      onEnter: function() {
        drawOverlay(ctx); // Draw character selection overlay
      }
    },
    playing: {
      transitions: {
        win: 'game_over', // Transition to 'game_over' state when a player wins
        draw: 'game_over', // Transition to 'game_over' state when the game ends in a draw
        pause: 'pause', // Transition to 'pause' state when the game is paused
      },
      onEnter: function() {
        gameStarted = true; // Set gameStarted flag to true
        ppBtn.textContent = 'Pause'; // Update button text
        ssBtn.textContent = 'Stop'; // Update button text
      }
    },
    pause: {
      transitions: {
        play: 'playing', // Transition to 'playing' state to resume the game
        stop: 'stop', // Transition to 'stop' state to stop the game
      },
      onEnter: function() {
        ppBtn.textContent = 'Resume'; // Update button text
      }
    },
    stop: {
      transitions: {
        restart: 'start', // Transition to 'start' state to restart the game
      },
      onEnter: function() {
        resetGame(); // Reset the game
        ppBtn.textContent = 'Pause'; // Update button text
        ssBtn.textContent = 'Start'; // Update button text
      }
    },
    game_over: {
      transitions: {
        restart: 'start', // Transition to 'start' state to restart the game
      },
      onEnter: function() {
        gameStarted = false; // Set gameStarted flag to false
        ppBtn.textContent = 'Pause'; // Update button text
        ssBtn.textContent = 'Restart'; // Update button text
      }
    },
  }
});


// Function to reset character selection
function resetCharacterSelection() {
  characterSelected = false;
  drawOverlay(ctx, currentPlayer  ); // Redraw overlay to allow for character selection again
}

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
  if (machine.state === 'playing' || machine.state === 'pause' || machine.state === 'win' || machine.state === 'draw') {
    machine.dispatch('stop');
    resetCharacterSelection(); // Reset character selection when restarting the game
  } else if (machine.state === 'idle') {
    machine.dispatch('start');
  }
});

// Add a click event listener to the canvas 
// for making moves
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
  gameStarted = false;
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
    case 'select':
      ppBtn.textContent = 'Pause';
      ssBtn.textContent = 'Stop';
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
      break;
  }
});

// Function to initialize the game
function init() {
  board = createBoard(ctx);
  drawOverlay(ctx); // Call drawOverlay to draw character selection overlay
  drawBoard(ctx,board); // Draw the board

}
init(); // Call the init function to start the game
