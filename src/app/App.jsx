import { useReducer, useRef } from "react";
import FrontMenu from "../components/FrontMenu/FrontMenu";
import GameShell from "../components/GameShell/GameShell";
import { initialState, reducer } from "./state";
import {
  applyCpuMove,
  applyPlayerMove,
  evaluateBoard,
} from "../logic/gameEngine";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ref to hold pending CPU timeout id so we can clear it when navigating away
  const cpuTimeoutRef = useRef(null);

  const handleClick = (index) => {
    if (state.board[index] !== "" || state.gameOver) return;

    let newBoard = [...state.board];

    if (state.gameMode === "cpu") {
      // Player move
      newBoard = applyPlayerMove(state.board, index, state.playerSymbol);
      dispatch({
        type: "PLAYER_MOVE",
        payload: { board: newBoard, currentPlayer: state.cpuSymbol },
      });

      const result = evaluateBoard(newBoard);
      if (result) return dispatch({ type: "END_GAME", payload: result });

      // CPU move
      // store timeout id in ref so we can clear it if user quits/restarts
      cpuTimeoutRef.current = setTimeout(() => {
        const cpuBoard = applyCpuMove(
          newBoard,
          state.cpuSymbol,
          state.difficulty
        );

        const cpuIndex = cpuBoard.findIndex(
          (cell, i) => cell !== newBoard[i] && cell === state.cpuSymbol
        );

        dispatch({
          type: "CPU_MOVE",
          payload: {
            board: cpuBoard,
            currentPlayer: state.playerSymbol,
            lastMoveByCpu: cpuIndex,
          },
        });

        const cpuResult = evaluateBoard(cpuBoard);
        if (cpuResult)
          return dispatch({ type: "END_GAME", payload: cpuResult });

        // clear ref when finished
        cpuTimeoutRef.current = null;
      }, 500);
    } else if (state.gameMode === "two") {
      // Two player move
      newBoard = applyPlayerMove(state.board, index, state.currentPlayer);
      const nextPlayer = state.currentPlayer === "X" ? "O" : "X";
      dispatch({
        type: "PLAYER_MOVE",
        payload: { board: newBoard, currentPlayer: nextPlayer },
      });

      const result = evaluateBoard(newBoard);
      if (result) return dispatch({ type: "END_GAME", payload: result });
    }
  };

  const handleBackToMenu = () => {
    if (cpuTimeoutRef.current) {
      clearTimeout(cpuTimeoutRef.current);
      cpuTimeoutRef.current = null;
    }
    dispatch({ type: "BACK_TO_MENU" });
  };

  const handleRestart = () => {
    if (cpuTimeoutRef.current) {
      clearTimeout(cpuTimeoutRef.current);
      cpuTimeoutRef.current = null;
    }
    dispatch({ type: "RESTART" });
  };

  return (
    <div className="app">
      {state.appStep === "menu" && (
        <FrontMenu
          onStart={(symbol, mode, difficulty) =>
            dispatch({
              type: "START_GAME",
              payload: { symbol, mode, difficulty },
            })
          }
        />
      )}

      {["playing", "roundOver"].includes(state.appStep) && (
        <GameShell
          board={state.board}
          handleClick={handleClick}
          currentPlayer={state.currentPlayer}
          gameMode={state.gameMode}
          playerSymbol={state.playerSymbol}
          score={state.score}
          endMessage={state.endMessage}
          winnerSymbol={state.winnerSymbol}
          winningCells={state.winningCells}
          onRestart={handleRestart}
          onBackToMenu={handleBackToMenu}
          lastMoveByCpu={state.lastMoveByCpu}
        />
      )}
    </div>
  );
};

export default App;
