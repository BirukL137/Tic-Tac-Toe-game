import { WINNING_COMBOS } from "./constants";

export const checkWinner = (board) => {
  for (let combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  return null;
};

export const checkDraw = (board) => {
  return board.every((cell) => cell !== "") && !checkWinner(board);
};
