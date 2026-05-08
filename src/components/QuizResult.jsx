const QuizResult = ({ score, total, onNext, currentGroup }) => {
  return (
    <div className="main">
      <h2>{currentGroup}</h2>
      <h2>正解率:{Math.round(score / total * 100)}%  ({score} / {total})</h2>
    </div>
  );
};

export default QuizResult;
