import "./Stat.css";

const Stat = ({ symbol, title, score }) => {
  return (
    <div className={`stat__content ${symbol}`}>
      <p className="stat__title">{title}</p>
      <p className="stat__score">{score}</p>
    </div>
  );
};

export default Stat;
