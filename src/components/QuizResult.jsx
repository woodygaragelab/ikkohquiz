const QuizResult = ({ score, total, onNext, currentGroup }) => {
  return (
    <div className="main">
      <h2 style={{ padding: '0 16px' }}>{currentGroup}</h2>
      <h2 style={{ padding: '0 16px' }}>正解率:{Math.round(score / total * 100)}%  ({score} / {total})</h2>
    </div>
  );
};

export default QuizResult;
