import Button from "../../common/Button";
import "./SymbolSelector.css";
import iconXGrey from "/images/icons/icon-x-grey.svg";
import iconXBlack from "/images/icons/icon-x-black.svg";
import iconOGrey from "/images/icons/icon-o-grey.svg";
import iconOBlack from "/images/icons/icon-o-black.svg";

const SymbolSelector = ({ selectedSymbol, onSelect }) => {
  return (
    <div className="symbol__selector">
      <h3>Pick player 1's mark</h3>
      <div className="menu__buttons">
        <Button
          variant={selectedSymbol === "X" ? "selected" : ""}
          onClick={() => onSelect("X")}
        >
          <img src={selectedSymbol === "X" ? iconXBlack : iconXGrey} alt="X" />{" "}
        </Button>
        <Button
          variant={selectedSymbol === "O" ? "selected" : ""}
          onClick={() => onSelect("O")}
        >
          <img src={selectedSymbol === "O" ? iconOBlack : iconOGrey} alt="O" />
        </Button>
      </div>
      <p>Remember x goes first</p>
    </div>
  );
};

export default SymbolSelector;
