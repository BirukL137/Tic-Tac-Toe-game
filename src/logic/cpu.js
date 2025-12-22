import { checkDraw, checkWinner } from "./rules";

/**
 * CPU move strategy.
 * Easy: random empty cell.
 * Medium: heuristic rull.
 * Hard: smarter AI (minimax).
 *
 * @param {string[]} board - Array of 9 cells ("X", "O", or "")
 * @param {string} cpuSymbol - "X" or "O"
 * @returns {string[]} new board with CPU move applied
 */

export const randomMove = (board, cpuSymbol) => {
  // Find empty cells
  const emptyIndices = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);

  if (emptyIndices.length === 0) return board;

  // Pick random empty cell
  const randomIndex =
    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const newBoard = [...board];
  newBoard[randomIndex] = cpuSymbol;
  return newBoard;
};

export const minimaxMove = (board, cpuSymbol) => {
  const playerSymbol = cpuSymbol === "X" ? "O" : "X";

  const minimax = (newBoard, depth, isMaximizing) => {
    const winningResult = checkWinner(newBoard);
    if (winningResult) {
      if (winningResult.winner === cpuSymbol) return 10 - depth;
      if (winningResult.winner === playerSymbol) return depth - 10;
    }
    if (checkDraw(newBoard)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      newBoard.forEach((cell, index) => {
        if (cell === "") {
          newBoard[index] = cpuSymbol;
          const score = minimax(newBoard, depth + 1, false);
          newBoard[index] = "";
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      newBoard.forEach((cell, index) => {
        if (cell === "") {
          newBoard[index] = playerSymbol;
          const score = minimax(newBoard, depth + 1, true);
          newBoard[index] = "";
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };

  let bestScore = -Infinity;
  let move = null;

  board.forEach((cell, index) => {
    if (cell === "") {
      board[index] = cpuSymbol;
      const score = minimax(board, 0, false);
      board[index] = "";
      if (score > bestScore) {
        bestScore = score;
        move = index;
      }
    }
  });

  const newBoard = [...board];
  if (move !== null) newBoard[move] = cpuSymbol;
  return newBoard;
};

// Heuristic rule-based medium difficulty
export const mediumMove = (board, cpuSymbol) => {
  const playerSymbol = cpuSymbol === "X" ? "O" : "X";
  const emptyIndices = board
    .map((c, i) => (c === "" ? i : null))
    .filter((i) => i !== null);
  const applyMove = (b, idx, sym) => {
    const copy = [...b];
    copy[idx] = sym;
    return copy;
  };
  // 1) Win immediately if possible
  for (let idx of emptyIndices) {
    const candidate = applyMove(board, idx, cpuSymbol);
    const res = checkWinner(candidate);
    if (res && res.winner === cpuSymbol) return candidate;
  }
  // 2) Block opponent immediate win
  for (let idx of emptyIndices) {
    const candidate = applyMove(board, idx, playerSymbol);
    const res = checkWinner(candidate);
    if (res && res.winner === playerSymbol) {
      return applyMove(board, idx, cpuSymbol);
    }
  }
  // 3) Create fork
  const findFork = (sym) => {
    for (let idx of emptyIndices) {
      const candidate = applyMove(board, idx, sym);
      let winCount = 0;
      const nextEmpty = candidate
        .map((c, i) => (c === "" ? i : null))
        .filter((i) => i !== null);
      for (let j of nextEmpty) {
        const after = applyMove(candidate, j, sym);
        const res = checkWinner(after);
        if (res && res.winner === sym) winCount++;
      }
      if (winCount >= 2) return idx;
    }
    return null;
  };
  const forkIdx = findFork(cpuSymbol);
  if (forkIdx !== null) return applyMove(board, forkIdx, cpuSymbol);
  // 4) Block opponent fork
  const oppForkIdx = findFork(playerSymbol);
  if (oppForkIdx !== null) {
    return applyMove(board, oppForkIdx, cpuSymbol);
  }
  // 5) Take center
  if (board[4] === "") return applyMove(board, 4, cpuSymbol);
  // 6) Opposite corner
  const opposite = { 0: 8, 2: 6, 6: 2, 8: 0 };
  for (let corner of [0, 2, 6, 8]) {
    const opp = opposite[corner];
    if (board[corner] === "" && board[opp] === playerSymbol) {
      return applyMove(board, corner, cpuSymbol);
    }
  }
  // 7) Any empty corner
  const corners = [0, 2, 6, 8].filter((i) => board[i] === "");
  if (corners.length) {
    const chosen = corners[Math.floor(Math.random() * corners.length)];
    return applyMove(board, chosen, cpuSymbol);
  }
  // 8) Any side
  const sides = [1, 3, 5, 7].filter((i) => board[i] === "");
  if (sides.length) {
    const chosen = sides[Math.floor(Math.random() * sides.length)];
    return applyMove(board, chosen, cpuSymbol);
  }
  // fallback
  return randomMove(board, cpuSymbol);
};
