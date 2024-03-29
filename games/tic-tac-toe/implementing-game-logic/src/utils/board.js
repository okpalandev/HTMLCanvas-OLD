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
    ctx.font = 'bold 46px Courier New'; // Font style, size, and family

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
 * Draws an overlay on the canvas to separate 'X' and 'O' sides.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
function drawOverlay(ctx) {
    const { width: WIDTH, height: HEIGHT } = ctx.canvas;
    // Draw vertical line
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.closePath();

    // Draw 'X' on the left side
    ctx.fillStyle = 'green';
    ctx.font = 'bold 46px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('X', WIDTH / 4, HEIGHT / 2);
    
    // Draw 'O' on the right side
    ctx.fillStyle = 'red';
    ctx.fillText('O', (WIDTH / 4) * 3, HEIGHT / 2);
}

export { createBoard, drawX, drawO, drawBoard, drawOverlay };


