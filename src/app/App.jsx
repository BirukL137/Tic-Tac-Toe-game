import FrontMenu from "../components/FrontMenu/FrontMenu";
import GameShell from "../components/GameShell/GameShell";
import useGame from "../hooks/useGame";

const App = () => {
  const { state } = useGame();
  return (
    <div className="app">
      {state.appStep === "menu" && <FrontMenu />}

      {["playing", "roundOver"].includes(state.appStep) && <GameShell />}
    </div>
  );
};

export default App;
