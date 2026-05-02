const QuizResult = ({ score, total, onNext }) => {
  return (
    <div className="main">
      <h1>クイズ結果</h1>
      <h2>正解率:{score / total * 100}%  ({score} / {total})</h2>
      <button className="button" onClick={onNext}>問題選択</button>
    </div>
  );
};

export default QuizResult;
