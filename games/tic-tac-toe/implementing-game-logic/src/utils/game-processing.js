const isGameOver=(board)=>{
    return board.every((b,i)=> b[i] != '' );
}
export {isGameOver}

