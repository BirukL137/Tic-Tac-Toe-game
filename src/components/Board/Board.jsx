import Cell from "./Cell";
import "./Board.css";
import useGame from "../../hooks/useGame";

const Board = ({ handleClick }) => {
  const { state } = useGame();
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {state.board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          index={index}
          onClick={() => handleClick(index)}
          isWinning={state.winningCells.includes(index)}
        />
      ))}
    </div>
  );
};
export default Board;
