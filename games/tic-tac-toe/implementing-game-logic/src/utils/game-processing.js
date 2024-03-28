const isGameOver=(board)=>{
    return board.every((b,i)=> b[i] != '' );
}
export {isGameOver}

const isWin=(board,player)=>{
    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    return winPatterns.some((pattern)=>{
        return pattern.every((index)=>{
            return board[index] === player;
        });
    });
}

export {isWin}

