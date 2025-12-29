import { useState } from "react";
import Board from "../Board/Board";
import Scoreboard from "./Scoreboard/Scoreboard";
import EndRoundModal from "./Modal/EndRoundModal";
import ConfirmQuitModal from "./Modal/ConfirmQuitModal";
import Header from "./Header/Header";
import "./GameShell.css";
import useGame from "../../hooks/useGame";
import {
  applyCpuMove,
  applyPlayerMove,
  evaluateBoard,
} from "../../logic/gameEngine";

const GameShell = () => {
  const { state, dispatch, helpers } = useGame();
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

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

      // CPU move — schedule via context helper so it can be cleared centrally
      helpers.scheduleCpuMove(() => {
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
      });
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
    helpers.clearPendingCpuMove();
    dispatch({ type: "BACK_TO_MENU" });
  };

  const handleRestart = () => {
    helpers.clearPendingCpuMove();
    dispatch({ type: "RESTART" });
  };
  return (
    <div
      className={`game__shell ${
        showQuitConfirm ? "disable__interactions" : ""
      }`}
    >
      <h1 className="visually__hidden">Tic Tac Toe</h1>
      {/* Header */}
      <Header onSet={setShowQuitConfirm} />

      {/* Board grid */}
      <Board handleClick={handleClick} />

      {/* Scoreboard */}
      <Scoreboard />

      {/* End round modal (only shows when round ends) */}
      {state.endMessage && (
        <EndRoundModal
          onRestart={handleRestart}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {showQuitConfirm && (
        <ConfirmQuitModal
          onCancel={() => setShowQuitConfirm(false)}
          onConfirm={() => {
            setShowQuitConfirm(false);
            handleRestart();
          }}
        />
      )}
    </div>
  );
};

export default GameShell;
