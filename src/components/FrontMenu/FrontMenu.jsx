import { useState } from "react";
import SymbolSelector from "./SymbolSelector/SymbolSelector";
import ModeSelector from "./ModeSelector/ModeSelector";
import DifficultySelector from "./ModeSelector/DifficultySelector";
import logo from "/images/logo.svg";
import "./FrontMenu.css";

const FrontMenu = ({ onStart }) => {
  const [selectedSymbol, setSelectedSymbol] = useState("O");
  const [selectedMode, setSelectedMode] = useState(null);

  const handleStart = (mode, difficulty = null) => {
    if (selectedSymbol && mode) {
      onStart(selectedSymbol, mode, difficulty);
    }
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    if (mode === "two") {
      // start immediately for two-player mode
      handleStart(mode, null);
    }
    // if mode === 'cpu', we wait for difficulty selection
  };

  const handleDifficultySelect = (difficulty) => {
    // start the game as soon as difficulty is chosen
    handleStart("cpu", difficulty);
  };

  return (
    <div className="front__menu">
      <h1 className="visually__hidden">Tic Tac Toe</h1>
      {selectedMode === "cpu" ? (
        <>
          {/* Difficulty selection (shown only for CPU mode) */}
          <DifficultySelector
            onSelect={handleDifficultySelect}
            enabled={selectedMode === "cpu"}
          />
        </>
      ) : (
        <>
          <img src={logo} alt="Logo" className="front__logo" />

          {/* Symbol selection */}
          <SymbolSelector
            selectedSymbol={selectedSymbol}
            onSelect={setSelectedSymbol}
          />

          {/* Mode selection */}
          <ModeSelector
            selectedMode={selectedMode}
            onSelect={handleModeSelect}
          />
        </>
      )}
    </div>
  );
};

export default FrontMenu;
