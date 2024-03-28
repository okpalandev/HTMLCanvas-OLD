import { createBoard, drawBoard, drawO, drawX } from './utils/index.js';

const canvas = document.getElementById('tic-tac-toe');
const ctx = canvas.getContext('2d');
const board = createBoard(ctx); // Pass the context to createBoard

drawBoard(board);
drawO(ctx,1,1)
drawX(ctx,0,0)

