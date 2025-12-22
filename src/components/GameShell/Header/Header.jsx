import Button from "../../common/Button";
import "./Header.css";
import logo from "/images/logo.svg";
import iconXGrey from "/images/icons/icon-x-grey.svg";
import iconOGrey from "/images/icons/icon-o-grey.svg";
import iconRestart from "/images/icons/icon-restart.svg";

const Header = ({ currentPlayer, onSet }) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" aria-hidden="true" />
      <div className="header__turn-indicator">
        <img
          src={currentPlayer === "X" ? iconXGrey : iconOGrey}
          alt={currentPlayer === "X" ? "Icon X" : "Icon O"}
        />
        <span>Turn</span>
      </div>
      <Button className="header__btn" variant="" onClick={() => onSet(true)}>
        <img src={iconRestart} alt="Restart Icon" aria-hidden="true" />
      </Button>
    </header>
  );
};

export default Header;
