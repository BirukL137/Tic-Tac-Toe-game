import Button from "../../common/Button";
import "./modal.css";
import iconX from "/images/icons/icon-x.svg";
import iconO from "/images/icons/icon-o.svg";

const EndRoundModal = ({ message, onRestart, onBackToMenu, winnerSymbol }) => {
  const renderWinnerIcon = () => {
    if (!winnerSymbol) return null;
    const src = winnerSymbol === "X" ? iconX : iconO;
    const alt = `Winner ${winnerSymbol}`;
    return (
      <img src={src} alt={alt} className="winner__icon" aria-hidden="true" />
    );
  };

  return (
    <div className="end__round__modal" role="dialog" aria-modal="true">
      <div className={`modal__content ${winnerSymbol === null ? "pad" : ""}`}>
        <p
          className={`modal__msg ${winnerSymbol === null ? "tied" : ""}`}
          aria-live="polite"
        >
          {message}
        </p>
        {winnerSymbol && (
          <div className="winner__line" aria-hidden="false">
            {renderWinnerIcon()}
            <span className="winner__text">Takes the round</span>
          </div>
        )}
        <div className="modal__buttons">
          <Button variant="selected" onClick={onBackToMenu}>
            Back to Menu
          </Button>
          <Button variant="primary" onClick={onRestart}>
            Next Round
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EndRoundModal;
