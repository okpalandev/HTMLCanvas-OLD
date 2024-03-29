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
let gameStarted = false; // Flag to track if the game has started
let board; // Declare the board variable

// Define the state machine
const machine = createMachine({
  // Define initial state
  initial: 'idle',
  states: {
    idle: {
      transitions: {
        // Transition to the 'start' state when the game starts
        start: 'start',
        // Transition to the 'stop' state when the game stops
        stop: 'stop',
      },
    },
 // Modify the 'start' state in the state machine definition
start: {
  transitions: {
    // Transition to the 'playing' state when the game starts playing
    play: 'playing',
    // Transition to the 'pause' state when the game is paused
    pause: 'pause',
    // Transition to the 'stop' state when the game stops
    stop: 'stop',
    // Stay in the 'idle' state if the game hasn't started yet
    idle: 'idle',
  },
  onEnter: function() {
    // Start the game timer
    startTimer();
    // Draw the overlay UI for selecting player character
    drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
    // Draw the initial game board
    drawBoard();
  },
  onExit: function() {
    // Clear the overlay when exiting the 'start' state
    clearOverlay(ctx);
  }
},
    pause: {
      transitions: {
        // Transition to the 'playing' state when the game is resumed
        play: 'playing',
        // Transition to the 'stop' state when the game stops
        stop: 'stop',
      },
    },
    stop: {
      transitions: {
        // Transition to the 'start' state when the game restarts
        restart: 'start',
      },
      onEnter: function() {
        // Pause the game timer
        pauseTimer();
        // Reset game variables and state
        resetGame();
      },
    },
    playing: {
      transitions: {
        // Stay in the 'playing' state when a move is made
        move: 'playing',
        // Transition to the 'win' state when a player wins
        win: 'win',
        // Transition to the 'draw' state when the game is drawn
        draw: 'draw',
        // Transition to the 'pause' state when the game is paused
        pause: 'pause',
      },
    },
    win: {
      transitions: {
        // Transition to the 'stop' state when the game is stopped after a win
        stop: 'stop',
      },
      onEnter: function() {
        // Pause the game timer when a player wins
        pauseTimer();
        // Draw the winning line
        const winningCells = getWinningCells(board, currentPlayer);
        drawWinningLine(ctx, winningCells);
      },
    },
    draw: {
      transitions: {
        // Transition to the 'start' state when the game restarts after a draw
        restart: 'start',
      },
      onEnter: function() {
        // Pause the game timer when the game ends in a draw
        pauseTimer();
      },
    },
  },
});

// Event listener for the pause-play button
const ppBtn = document.getElementById('pause-play');
ppBtn.addEventListener('click', function () {
  // Toggle between pausing and resuming the game
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
  // Start or stop the game based on its current state
  if (machine.state === 'playing' || machine.state === 'pause') {
    machine.dispatch('stop');
  } else if (machine.state === 'idle') {
    machine.dispatch('start'); // Dispatch 'start' action to transition to the start state
  }
});

// Add a click event listener to the canvas for making moves
canvas.addEventListener('click', function (event) {
  // Check if the game has started
  if (!gameStarted) {
    return; // Ignore clicks if the game has not started
  }

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
      machine.dispatch('win');
    } else if (isBoardFull(board)) {
      machine.dispatch('draw');
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      // Update the game state
      machine.dispatch('move');
    }
  }
});

// Function to reset the game
function resetGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // Initialize the game board
  board = createBoard(ctx);
  // Reset the current player
  currentPlayer = 'X';
  // Draw the overlay UI for selecting player character
  drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');
}

// Function to initialize the game
function init() {
  // Initialize the game board
  board = createBoard(ctx);
  // Draw the overlay UI for selecting player character
  drawOverlay(ctx, currentPlayer === 'X' ? 'O' : 'X');

}

// Call the init function to start the game
init();

// Listen for state transitions
machine.on('transition', function (state) {
  // Log state transitions
  console.log('Transition:', state);

  // Update button texts based on game state
  if (state === 'playing') {
    ppBtn.textContent = 'Pause'; // Update the pause-play button text
    ssBtn.textContent = 'Stop'; // Update the stop-start button text
    gameStarted = true; // Set gameStarted flag to true
  } else if (state === 'stop') {
    resetGame(); // Reset the game
  }
});
