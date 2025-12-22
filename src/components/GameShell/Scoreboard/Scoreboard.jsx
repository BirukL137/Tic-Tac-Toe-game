import Stat from "../../common/Stat";

const Scoreboard = ({ score, gameMode, playerSymbol }) => {
  return (
    <div className="scoreboard">
      {gameMode === "cpu" ? (
        <>
          <Stat
            symbol="X"
            title={`X (${playerSymbol === "X" ? "YOU" : "CPU"})`}
            score={playerSymbol === "X" ? score.player1 : score.cpu}
          />
          <Stat symbol="" title="TIES" score={score.draw} />
          <Stat
            symbol="O"
            title={`O (${playerSymbol === "X" ? "CPU" : "YOU"})`}
            score={playerSymbol === "X" ? score.cpu : score.player1}
          />
        </>
      ) : (
        <>
          <Stat
            symbol="X"
            title={`X (${playerSymbol === "X" ? "P1" : "P2"})`}
            score={playerSymbol === "X" ? score.player1 : score.player2}
          />
          <Stat symbol="" title="TIES" score={score.draw} />
          <Stat
            symbol="O"
            title={`O (${playerSymbol === "X" ? "P2" : "P1"})`}
            score={playerSymbol === "X" ? score.player2 : score.player1}
          />
        </>
      )}
    </div>
  );
};

export default Scoreboard;
