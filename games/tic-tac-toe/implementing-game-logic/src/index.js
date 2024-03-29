import { createMachine } from './utils/state-machine.js';
import { createBoard, drawX, drawO, drawBoard, drawOverlay} from './utils/board.js';
import { isWin, isBoardFull } from './utils/game-processing.js';
import { startTimer, pauseTimer, resumeTimer } from './utils/timer.js';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 800;

// Define the state machine
const machine = createMachine({
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
        idle: 'idle', 
      },
      onEnter: function() {
        startTimer(); // Start the timer
        drawOverlay(ctx); // Draw the overlay UI
        canvas.addEventListener('click', overlayClickListener); // Listen for clicks on the overlay
      },
      onExit: function() {
        canvas.removeEventListener('click', overlayClickListener); // Remove the click listener
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
        pauseTimer(); // Pause the timer
        resetGame(); // Reset game variables
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
        pauseTimer(); // Pause the timer
      },
    },
    draw: {
      transitions: {
        restart: 'start',
      },
      onEnter: function() {
        pauseTimer(); // Pause the timer
      },
    },
  },
});

let currentPlayer = 'X'; // Start with player X
let gameStarted = false; // Declare gameStarted variable

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
  } else {
    machine.dispatch('start'); // Dispatch 'start' action to transition to the start state
  }
});

// Remove the machine.dispatch('start') from init()
function init() {
  // Initialize the game board
  let board = createBoard(ctx);

  // Randomly select the starting player
  currentPlayer = Math.random() < 0.5 ? 'X' : 'O';

  // Add a click event listener to the canvas
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

  // Listen for state transitions
  machine.on('transition', function (state) {
    console.log('Transition:', state)
    if(state === 'start') {     
       gameStarted = true; // Set gameStarted flag to true

    } else if (state === 'playing' ) {
      ppBtn.textContent = 'Pause'; // Update the pause-play button text
      ssBtn.textContent = 'Stop'; // Update the stop-start button text
    } else if (state === 'stop') {
      resetGame(); // Reset the game
    }
  });
}

// Call the init function to start the game
init();
