/**
 * Creates the game board and initializes the board data.
 * @returns {Array<Array<string>>} The initialized game board.
 */
 function createBoard(ctx) {
    const {width:WIDTH,height:HEIGHT} = ctx.canvas; 
    ctx.beginPath();
    ctx.strokeStyle='black';
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
export {createBoard};
function drawX(ctx, i, j) {
    const { width: WIDTH , height: HEIGHT } = ctx.canvas;
    const cellWidth = WIDTH / 3;
    const cellHeight = HEIGHT / 3;
    const x = j * cellWidth + cellWidth / 2; // Center of the cell along the x-axis
    const y = i * cellHeight + cellHeight / 2; // Center of the cell along the y-axis

    // Set player color
    ctx.fillStyle = 'green'; // Adjusted color to green

  // Set font properties
    ctx.font = 'bold 46px Courier New'; // Font style, size, and family

    // Calculate text width and height
    const text = 'X';

    // Draw 'O' centered in the cell
    ctx.textAlign = 'center'; // Center horizontally
    ctx.textBaseline = 'middle'; // Center vertically
    ctx.fillText(text, x, y);
}
export {drawX};

function drawO(ctx, i, j) {
    const { width: WIDTH = 800, height: HEIGHT = 600 } = ctx.canvas;
    const cellWidth = WIDTH / 3;
    const cellHeight = HEIGHT / 3;
    const x = j * cellWidth + cellWidth / 2; // Center of the cell along the x-axis
    const y = i * cellHeight + cellHeight / 2; // Center of the cell along the y-axis

    // Set player color
    ctx.fillStyle = 'red';

    // Set font properties
    ctx.font = 'bold 46px Courier New'; // Font style, size, and family

    // Calculate text width and height
    const text = 'O';
   

    // Draw 'O' centered in the cell
    ctx.textAlign = 'center'; // Center horizontally
    ctx.textBaseline = 'middle'; // Center vertically
    ctx.fillText(text, x, y);
}

export  {drawO};

function drawBoard(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = board[i][j];
            if (cell === 'X') {
                drawX(i, j); // Pass the indices i, j
            } else if (cell === 'O') {
                drawO(i, j); // Pass the indices i, j
            }
        }
    }
    
}
export {drawBoard   }

