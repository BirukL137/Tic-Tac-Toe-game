import { describe, it, expect } from "vitest";
import { minimaxMove, mediumMove } from "./cpu";
import { checkWinner } from "./rules";

describe("minimaxMove (hard mode CPU)", () => {
  it("chooses winning move when available", () => {
    // CPU is "O", player is "X"
    // CPU can win by placing at index 2
    const board = ["O", "O", "", "X", "X", "", "", "", ""];

    const newBoard = minimaxMove(board, "O");

    expect(newBoard[2]).toBe("O"); // CPU should win immediately
  });

  it("blocks opponent's winning move", () => {
    // Player is "X", CPU is "O"
    // Player threatens to win at index 2
    const board = ["X", "X", "", "O", "", "", "", "", ""];

    const newBoard = minimaxMove(board, "O");

    expect(newBoard[2]).toBe("O"); // CPU should block player
  });

  it("forces a draw when no win possible", () => {
    // Near endgame scenario where only draw is possible
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", ""];

    const newBoard = minimaxMove(board, "X");

    // CPU must place at last empty cell (index 8)
    expect(newBoard[8]).toBe("X");
  });

  it("never leaves winning move unblocked", () => {
    const board = ["X", "", "X", "O", "", "", "", "", ""];

    const newBoard = minimaxMove(board, "O");

    // Player threatens at index 1 → CPU must block
    expect(newBoard[1]).toBe("O");
  });
});

describe("mediumMove (medium mode CPU)", () => {
  it("should win if possible", () => {
    // X X _
    // O O _
    // _ _ _
    const board = ["X", "X", "", "O", "O", "", "", "", ""];

    const result = mediumMove(board, "X");

    expect(result[2]).toBe("X"); // X wins
    expect(checkWinner(result)?.winner).toBe("X");
  });

  it("should block opponent win", () => {
    // O O _
    // X X _
    // _ _ _
    const board = ["O", "", "", "X", "X", "", "", "", ""];

    const result = mediumMove(board, "O");

    expect(result[5]).toBe("O"); // O blocks X
  });

  it("should create a fork", () => {
    // X _ _
    // _ O _
    // _ _ X
    const board = ["X", "", "", "", "O", "", "", "", "X"];

    const result = mediumMove(board, "O");

    // O should play at 2 or 6 to create a fork
    expect([2, 6]).toContain(
      result.findIndex((v, i) => board[i] === "" && v === "O")
    );
  });

  it("should block opponent fork", () => {
    // O _ _
    // _ X _
    // _ _ O
    const board = ["O", "", "", "", "X", "", "", "", "O"];

    const result = mediumMove(board, "X");

    // X should play at 2 or 6 to block fork
    expect([2, 6]).toContain(
      result.findIndex((v, i) => board[i] === "" && v === "X")
    );
  });

  it("should take center if available", () => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const result = mediumMove(board, "X");

    expect(result[4]).toBe("X");
  });

  it("should take a corner if center is taken", () => {
    const board = ["", "", "", "", "O", "", "", "", ""];
    const result = mediumMove(board, "X");
    const corners = [0, 2, 6, 8];

    expect(corners.some((i) => result[i] === "X")).toBe(true);
  });

  it("should take a side if center and corners are taken", () => {
    const board = ["O", "", "O", "O", "X", "O", "O", "", "O"];
    const result = mediumMove(board, "X");
    const sides = [1, 3, 5, 7];

    expect(sides.some((i) => result[i] === "X")).toBe(true);
  });
});
