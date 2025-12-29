import { applyCpuMove } from "../logic/gameEngine";

export const initialState = {
  appStep: "menu", // "menu" | "playing" | "roundOver"
  gameMode: null, // "cpu" | "two"
  difficulty: null, // "easy" | "medium" | "hard"
  playerSymbol: null,
  cpuSymbol: null,
  board: Array(9).fill(""),
  currentPlayer: "X",
  gameOver: false,
  winningCells: [],
  endMessage: "",
  winnerSymbol: null,
  score: { player1: 0, player2: 0, cpu: 0, draw: 0 },
  lastMoveByCpu: null,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME": {
      const { symbol, mode, difficulty } = action.payload;
      const cpuSymbol = symbol === "X" ? "O" : "X";
      let newBoard = Array(9).fill("");
      let currentPlayer = "X";

      // CPU starts if player chose O
      if (mode === "cpu" && symbol === "O") {
        newBoard = applyCpuMove(newBoard, cpuSymbol, state.difficulty);
        currentPlayer = "O";
      }

      return {
        ...state,
        appStep: "playing",
        gameMode: mode,
        difficulty,
        playerSymbol: symbol,
        cpuSymbol,
        board: newBoard,
        currentPlayer,
        gameOver: false,
        winningCells: [],
        endMessage: "",
        winnerSymbol: null,
        lastMoveByCpu: null,
      };
    }

    case "PLAYER_MOVE": {
      const { board, currentPlayer } = action.payload;
      return { ...state, board, currentPlayer };
    }

    case "CPU_MOVE": {
      const { board, currentPlayer, lastMoveByCpu } = action.payload;
      return { ...state, board, currentPlayer, lastMoveByCpu };
    }

    case "END_GAME": {
      const { winner, combo } = action.payload;
      let updatedScore = { ...state.score };
      let endMessage = "";
      let winnerSymbol = null;

      if (winner === "draw") {
        updatedScore.draw += 1;
        endMessage = "Round tied";
      } else {
        // Compose user-friendly messages depending on game mode
        if (state.gameMode === "cpu") {
          // In CPU mode, compare winner with player's symbol
          if (winner === state.playerSymbol) {
            updatedScore.player1 += 1;
            endMessage = "You won!";
            winnerSymbol = winner;
          } else {
            updatedScore.cpu += 1;
            endMessage = "oh no, you lost...";
            winnerSymbol = winner;
          }
        } else {
          // Two-player mode:
          if (winner === state.playerSymbol) {
            updatedScore.player1 += 1;
            endMessage = "Player 1 wins";
            winnerSymbol = winner;
          } else {
            updatedScore.player2 += 1;
            endMessage = "Player 2 wins";
            winnerSymbol = winner;
          }
        }
      }

      return {
        ...state,
        appStep: "roundOver",
        gameOver: true,
        endMessage,
        winnerSymbol,
        winningCells: combo || [],
        score: updatedScore,
        lastMoveByCpu: null,
      };
    }

    case "RESTART": {
      let newBoard = Array(9).fill("");
      let currentPlayer = "X";

      if (state.gameMode === "cpu" && state.playerSymbol === "O") {
        newBoard = applyCpuMove(newBoard, state.cpuSymbol, state.difficulty);
        currentPlayer = "O";
      }

      return {
        ...state,
        appStep: "playing",
        board: newBoard,
        currentPlayer,
        gameOver: false,
        winningCells: [],
        endMessage: "",
        winnerSymbol: null,
        lastMoveByCpu: null,
      };
    }

    case "BACK_TO_MENU":
      return { ...initialState };

    default:
      return state;
  }
};
