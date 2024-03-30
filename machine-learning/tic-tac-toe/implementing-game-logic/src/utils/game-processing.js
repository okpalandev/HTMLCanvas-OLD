const isWin = (board, player) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // Check if any of the win patterns match the player's cells

    return winPatterns.some(pattern => {
      return pattern.every(index => {

        const row = Math.floor(index / 3);
        const col = index % 3;
        return board[row][col] === player;
      });
    });

  };
  
  export { isWin };
  
function isBoardFull(board) {
    // Check if the board is full (all cells are filled)
    return board.every(row => row.every(cell => cell !== ''));
  }
  export {isBoardFull}

  

  function getWinningCells(board, player) {
    const winningCells = [];
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            winningCells.push([i, 0], [i, 1], [i, 2]);
            return winningCells;
        }
    }
    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            winningCells.push([0, j], [1, j], [2, j]);
            return winningCells;
        }
    }
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        winningCells.push([0, 0], [1, 1], [2, 2]);
        return winningCells;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        winningCells.push([0, 2], [1, 1], [2, 0]);
        return winningCells;
    }
    return winningCells;
}

export { getWinningCells };