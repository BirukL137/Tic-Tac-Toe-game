import iconX from "/images/icons/icon-x.svg";
import iconO from "/images/icons/icon-o.svg";
import outlineIconX from "/images/icons/icon-x-outline.svg";
import outlineIconO from "/images/icons/icon-o-outline.svg";
import iconXBlack from "/images/icons/icon-x-black.svg";
import iconOBlack from "/images/icons/icon-o-black.svg";
import useGame from "../../hooks/useGame";

const Cell = ({ value, index, onClick, isWinning }) => {
  const {
    state: { lastMoveByCpu, winnerSymbol, currentPlayer },
  } = useGame();
  return (
    <button
      className={`cell ${value === "X" ? "X" : value === "O" ? "O" : ""} 
        ${isWinning ? "winning__cell" : ""} 
        ${lastMoveByCpu === index ? "cpu__move" : ""}`}
      onClick={onClick}
      disabled={value !== ""}
      role="gridcell"
      aria-label={`Cell ${index + 1}, ${value || "empty"}`}
      aria-pressed={value !== ""}
    >
      {isWinning ? (
        <>
          <div className={`winning__cell ${winnerSymbol}`}>
            {winnerSymbol === "X" ? (
              <img src={iconXBlack} alt="X" />
            ) : (
              <img src={iconOBlack} alt="O" />
            )}
          </div>
        </>
      ) : (
        <>
          {value === "X" ? (
            <img src={iconX} alt="X" />
          ) : value === "O" ? (
            <img src={iconO} alt="O" />
          ) : (
            <img
              src={
                currentPlayer === "X"
                  ? outlineIconX
                  : currentPlayer === "O"
                  ? outlineIconO
                  : ""
              }
              alt=""
              className="outline__icon"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
  );
};

export default Cell;
