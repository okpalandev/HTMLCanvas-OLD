# The UI Algorithm Explained

To develop a functional user interface (UI) for a tic-tac-toe game, a systematic approach is crucial. Below is a breakdown of the code with explanations of each step:
## Creating the Canvas and Setting Constants

Firstly, a canvas element is obtained from the document, and a 2D rendering context is acquired. The canvas dimensions are set using predefined global constants, WIDTH and HEIGHT. This approach ensures consistency and facilitates communication about these dimensions within the codebase.

## Drawing the Tic-Tac-Toe Grid

The createBoard function is responsible for generating the tic-tac-toe grid on the canvas. It utilizes the canvas context (ctx) to draw horizontal and vertical lines to create the grid. Additionally, it initializes the board data, representing the state of the game.

```js
const canvas = document.getElementById('tic-tac-toe');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 800;
const HEIGHT = canvas.height = 600;

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
```
## Drawing 'X' and 'O' Symbols
Two functions, drawX and drawO, are implemented to draw 'X' and 'O' symbols on the tic-tac-toe board, respectively. These functions calculate the coordinates of the center of the cell based on the row and column indices provided. 'X' is drawn using two intersecting lines, while 'O' is drawn as a circle.

```js
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
```
# Drawing the Entire Board

The drawBoard function iterates through the board data and calls either drawX or drawO based on the content of each cell. This function effectively renders the current state of the game on the canvas.
```js
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

```
### Putting It All Together

Finally, the driver code instantiates the board using createBoard and then draws the initial state of the game using drawBoard. This sequential execution ensures that the canvas accurately reflects the game's state.

```js
const board = createBoard();
drawBoard(board);
```