const canvas = document.getElementById('tic-tac-toe'); 
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 600;

/**
 * Creates the game board and initializes the board data.
 * @returns {Array<Array<string>>} The initialized game board.
 */
function createBoard() {
    ctx.beginPath();
    
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

function drawX(i, j) {
    const x = j * (WIDTH / 3) + WIDTH / 6;
    const y = i * (HEIGHT / 3) + HEIGHT / 6;

    ctx.beginPath();
    ctx.moveTo(x - 50, y - 50);
    ctx.lineTo(x + 50, y + 50);
    ctx.moveTo(x + 50, y - 50);
    ctx.lineTo(x - 50, y + 50);
    ctx.stroke();
    ctx.closePath();
}

function drawO(i, j) {
    const x = j * (WIDTH / 3) + WIDTH / 6;
    const y = i * (HEIGHT / 3) + HEIGHT / 6;

    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
}

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

const board = createBoard();
drawBoard(board);

