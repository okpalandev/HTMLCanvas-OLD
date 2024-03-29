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

  
