/**
 * Creates the game board and initializes the board data.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {Array<Array<string>>} The initialized game board.
 */
function createBoard(ctx) {
    const { width: WIDTH, height: HEIGHT } = ctx.canvas;
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    // Draw vertical lines
    for (let x = WIDTH / 3; x <= WIDTH; x += WIDTH / 3) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
    }

    // Draw horizontal lines
    for (let y = HEIGHT / 3; y <= HEIGHT; y += HEIGHT / 3) {
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
    }
    ctx.stroke();
    ctx.closePath();

    // Initialize board data
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    return board;
}

/**
 * Draws 'X' on the canvas at the specified cell.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} i - The row index of the cell.
 * @param {number} j - The column index of the cell.
 */
function drawX(ctx, i, j) {
    const { width: WIDTH, height: HEIGHT } = ctx.canvas;
    const cellWidth = WIDTH / 3;
    const cellHeight = HEIGHT / 3;
    const x = j * cellWidth + cellWidth / 2; // Center of the cell along the x-axis
    const y = i * cellHeight + cellHeight / 2; // Center of the cell along the y-axis

    // Set player color
    ctx.fillStyle = 'green'; // Adjusted color to green

    // Set font properties
    ctx.font = 'bold 46px Courier New'; // Font style, size, and family

    // Draw 'X' centered in the cell
    ctx.textAlign = 'center'; // Center horizontally
    ctx.textBaseline = 'middle'; // Center vertically
    ctx.fillText('X', x, y);
}

/**
 * Draws 'O' on the canvas at the specified cell.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} i - The row index of the cell.
 * @param {number} j - The column index of the cell.
 */
function drawO(ctx, i, j) {
    const { width: WIDTH, height: HEIGHT } = ctx.canvas;
    const cellWidth = WIDTH / 3;
    const cellHeight = HEIGHT / 3;
    const x = j * cellWidth + cellWidth / 2; // Center of the cell along the x-axis
    const y = i * cellHeight + cellHeight / 2; // Center of the cell along the y-axis

    // Set player color
    ctx.fillStyle = 'red';

    // Set font properties
    ctx.font = 'bold 100px Courier New'; // Font style, size, and family

    // Draw 'O' centered in the cell
    ctx.textAlign = 'center'; // Center horizontally
    ctx.textBaseline = 'middle'; // Center vertically
    ctx.fillText('O', x, y);
}

/**
 * Draws the current state of the game board on the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Array<Array<string>>} board - The game board.
 */
function drawBoard(ctx, board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = board[i][j];
            if (cell === 'X') {
                drawX(ctx, i, j); // Pass the indices i, j
            } else if (cell === 'O') {
                drawO(ctx, i, j); // Pass the indices i, j
            }
        }
    }
}
/**
 * Draws an overlay on the canvas to select the player character ('X' or 'O').
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {string} currentPlayer - The current player ('X' or 'O').
 */
function drawOverlay(ctx, currentPlayer) {
    const { width: WIDTH, height: HEIGHT } = ctx.canvas;
    // fill the left side with green and the right side with red
    
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, WIDTH / 2, HEIGHT);
    ctx.fillStyle = 'green';
    ctx.fillRect(WIDTH / 2, 0, WIDTH / 2, HEIGHT);

    // Draw vertical line
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.closePath();

    // Draw 'X' on the left side
    ctx.fillStyle = currentPlayer === 'X' ? 'green' : 'gray';
    ctx.font = 'bold 205px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('X', WIDTH / 4, HEIGHT / 2);

    // Draw 'O' on the right side
    ctx.fillStyle = currentPlayer === 'O' ? 'red' : 'gray';
    ctx.fillText('O', (WIDTH / 4) * 3, HEIGHT / 2);

    // Add event listener to select character
    canvas.addEventListener('click', selectCharacter);

    function selectCharacter(event) {
        const x = event.clientX - canvas.offsetLeft;
        const selectedCharacter = x < WIDTH / 2 ? 'X' : 'O';
        if (selectedCharacter !== currentPlayer) {
            currentPlayer = selectedCharacter;
            // Clear the canvas and redraw the overlay with the updated selection
            clearCanvas(ctx);
            /**  drawOverlay(ctx, currentPlayer); */
        }
        // Remove the event listener after character selection
        canvas.removeEventListener('click', selectCharacter);
    }
}

function clearCanvas(ctx) {
    const { width: WIDTH, height: HEIGHT } = ctx.canvas;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

export { clearCanvas }

function drawWinningLine(ctx, board, winningCells) {
    const cellWidth = WIDTH / 3;
    const cellHeight = HEIGHT / 3;
    
    // Set line color and thickness
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
  
    ctx.beginPath();
    // Determine the starting position of the line based on the first winning cell
    const startX = winningCells[0][1] * cellWidth + cellWidth / 2;
    const startY = winningCells[0][0] * cellHeight + cellHeight / 2;
    ctx.moveTo(startX, startY);
    
    // Draw line through all winning cells
    for (let i = 1; i < winningCells.length; i++) {
        const x = winningCells[i][1] * cellWidth + cellWidth / 2;
        const y = winningCells[i][0] * cellHeight + cellHeight / 2;
        ctx.lineTo(x, y);
    }
  
    ctx.stroke();
    ctx.closePath();
    
}
export { drawWinningLine}
export { createBoard, drawX, drawO, drawBoard, drawOverlay };