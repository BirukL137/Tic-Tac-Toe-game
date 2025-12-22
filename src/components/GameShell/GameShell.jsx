import { useState } from "react";
import Board from "../Board/Board";
import Scoreboard from "./Scoreboard/Scoreboard";
import EndRoundModal from "./Modal/EndRoundModal";
import ConfirmQuitModal from "./Modal/ConfirmQuitModal";
import Header from "./Header/Header";
import "./GameShell.css";

const GameShell = ({
  board,
  handleClick,
  currentPlayer,
  gameMode,
  playerSymbol,
  score,
  endMessage,
  winnerSymbol,
  winningCells,
  onRestart,
  onBackToMenu,
  lastMoveByCpu,
}) => {
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  return (
    <div
      className={`game__shell ${
        showQuitConfirm ? "disable__interactions" : ""
      }`}
    >
      <h1 className="visually__hidden">Tic Tac Toe</h1>
      {/* Header */}
      <Header currentPlayer={currentPlayer} onSet={setShowQuitConfirm} />

      {/* Board grid */}
      <Board
        board={board}
        handleClick={handleClick}
        winningCells={winningCells}
        lastMoveByCpu={lastMoveByCpu}
        currentPlayer={currentPlayer}
        winnerSymbol={winnerSymbol}
      />

      {/* Scoreboard */}
      <Scoreboard
        score={score}
        gameMode={gameMode}
        playerSymbol={playerSymbol}
      />

      {/* End round modal (only shows when round ends) */}
      {endMessage && (
        <EndRoundModal
          message={endMessage}
          onRestart={onRestart}
          onBackToMenu={onBackToMenu}
          winnerSymbol={winnerSymbol}
        />
      )}

      {showQuitConfirm && (
        <ConfirmQuitModal
          onCancel={() => setShowQuitConfirm(false)}
          onConfirm={() => {
            setShowQuitConfirm(false);
            onRestart();
          }}
        />
      )}
    </div>
  );
};

export default GameShell;
