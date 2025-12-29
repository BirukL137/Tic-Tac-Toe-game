import Button from "../../common/Button";
import "./ModeSelector.css";

const ModeSelector = ({ onSelect }) => {
  return (
    <div className="mode__selector">
      <h2 className="visually__hidden">Choose Game Mode</h2>
      <div className="menu__buttons">
        <Button variant="primary" onClick={() => onSelect("cpu")}>
          New game (Vs Cpu)
        </Button>
        <Button variant="secondary" onClick={() => onSelect("two")}>
          New game (Vs Player)
        </Button>
      </div>
    </div>
  );
};

export default ModeSelector;
