import Cell from "./Cell";
import "./Board.css";

const Board = ({
  board,
  handleClick,
  winningCells,
  lastMoveByCpu,
  currentPlayer,
  winnerSymbol,
}) => {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          index={index}
          onClick={() => handleClick(index)}
          isWinning={winningCells.includes(index)}
          lastMoveByCpu={lastMoveByCpu}
          currentPlayer={currentPlayer}
          winnerSymbol={winnerSymbol}
        />
      ))}
    </div>
  );
};
export default Board;
