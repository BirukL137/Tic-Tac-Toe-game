import Button from "../../common/Button";
import "./ModeSelector.css";

const DifficultySelector = ({ onSelect }) => {
  return (
    <div className="mode__selector">
      <h2>Choose Difficulty</h2>
      <div className="menu__buttons">
        <Button
          variant="primary"
          onClick={() => onSelect("easy")}
          aria-label="Easy mode: random CPU moves"
        >
          Easy
        </Button>
        <Button
          variant="secondary"
          onClick={() => onSelect("medium")}
          aria-label="Medium mode: heuristic CPU moves"
        >
          Medium
        </Button>
        <Button
          variant="selected"
          onClick={() => onSelect("hard")}
          aria-label="Hard mode: unbeatable CPU"
        >
          Hard
        </Button>
      </div>
    </div>
  );
};

export default DifficultySelector;
