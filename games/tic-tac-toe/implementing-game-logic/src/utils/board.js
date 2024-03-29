/**
 * Creates the game board and initializes the board data.
 * @returns {Array<Array<string>>} The initialized game board.
 */
 function createBoard( ctx) {
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

function drawBoard(ctx,board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = board[i][j];
            if (cell === 'X') {
                drawX(ctx,i, j); // Pass the indices i, j
            } else if (cell === 'O') {
                drawO(ctx,i, j); // Pass the indices i, j
            }
        }
    }
    
}
export {drawBoard  }

 function drawOverlay(ctx) {
    const { width: WIDTH , height: HEIGHT }
    = ctx.canvas;

//   draw a split line from the center which will divide the canvas into 2 equal parts
// then on the left side draw a green x and on the right side draw a red o
// make it clickable so that when the user clicks on the x or o it will start the game
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

export {drawOverlay};
