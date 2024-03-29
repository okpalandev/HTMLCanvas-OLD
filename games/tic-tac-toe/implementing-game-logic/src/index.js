import { createMachine } from './utils/state-machine.js';
import { createBoard, drawX, drawO, drawOverlay, clearOverlay, drawWinningLine } from './utils/board.js';
import { isWin, isBoardFull } from './utils/game-processing.js';
import { startTimer, pauseTimer, resumeTimer } from './utils/timer.js';

// Get the canvas element and its 2d rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 800;

// Initialize variables
let currentPlayer = 'X'; // Start with player X
let board; // Declare the board variable

// Define the state machine
const machine = createMachine({
  // Define initial state
  initial: 'idle',
  states: {
    idle: {
      transitions: {
        // Transition to the 'playing' state when the game starts
        start: 'playing',
      },
    },
    playing: {
      transitions: {
        // Transition to the 'stop' state when the game stops
        stop: 'stop',
      },
      onEnter: function() {
        // Start the game timer
        startTimer();
        // Draw the overlay UI for selecting player character
        drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
        // Initialize the game board
        board = createBoard(ctx);
      },
    },
    stop: {
      transitions: {
        // Transition to the 'idle' state when the game restarts
        restart: 'idle',
      },
      onEnter: function() {
        // Pause the game timer
        pauseTimer();
        // Clear the canvas
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        // Reset the current player
        currentPlayer = 'X';
        // Draw the overlay UI for selecting player character
        drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
      },
    },
  },
});

// Event listener for the start button
const startBtn = document.getElementById('start');
startBtn.addEventListener('click', function () {
  machine.dispatch('start');
});

// Event listener for the stop button
const stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', function () {
  machine.dispatch('stop');
});

// Event listener for the restart button
const restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', function () {
  machine.dispatch('restart');
});

// Add a click event listener to the canvas for making moves
canvas.addEventListener('click', function (event) {
  // Get the click coordinates relative to the canvas
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;

  // Calculate the clicked cell's row and column
  let row = Math.floor(y / (HEIGHT / 3));
  let col = Math.floor(x / (WIDTH / 3));

  // Check if the clicked cell is empty
  if (board[row][col] === '') {
    // Place the current player's symbol on the clicked cell
    if (currentPlayer === 'X') {
      drawX(ctx, row, col); // Draw 'X' on the canvas
      board[row][col] = 'X'; // Update the game board data
    } else {
      drawO(ctx, row, col); // Draw 'O' on the canvas
      board[row][col] = 'O'; // Update the game board data
    }

    // Check for win or draw conditions
    if (isWin(board, currentPlayer)) {
      console.log('Player', currentPlayer, 'wins!');
      machine.dispatch('stop');
    } else if (isBoardFull(board)) {
      console.log('It\'s a draw!');
      machine.dispatch('stop');
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
});

// Listen for state transitions
machine.on('transition', function (state) {
  // Log state transitions
  console.log('Transition:', state);
});

// Function to clear the canvas and reset the game
function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// Function to initialize the game
function init() {
  // Draw the overlay UI for selecting player character
  drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
}

// Call the init function to start the game
init();
