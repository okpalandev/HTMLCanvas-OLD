import { createBoard, drawBoard, drawO, drawX } from './utils/index.js';

const canvas = document.getElementById('tic-tac-toe');
const ctx = canvas.getContext('2d');
const board = createBoard(); // Pass the context to createBoard

drawBoard(ctx,board);
drawO(ctx,1,1);
drawX(ctx,0,0);

drawO(ctx,0,1);
drawX(ctx,1,0);
drawO(ctx,2,1);

