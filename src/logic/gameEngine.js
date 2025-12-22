import { mediumMove, minimaxMove, randomMove } from "./cpu";
import { checkDraw, checkWinner } from "./rules";

export const applyPlayerMove = (board, index, symbol) => {
  if (board[index] !== "") return board;
  const newBoard = [...board];
  newBoard[index] = symbol;
  return newBoard;
};

export const applyCpuMove = (board, symbol, difficulty) => {
  if (difficulty === "easy") return randomMove(board, symbol);
  else if (difficulty === "hard") return minimaxMove(board, symbol);
  else return mediumMove(board, symbol);
};

export const evaluateBoard = (board) => {
  const result = checkWinner(board);
  if (result) return result;
  if (checkDraw(board)) return { winner: "draw" };
  return null;
};
