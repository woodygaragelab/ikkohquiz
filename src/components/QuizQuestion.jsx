const QuizQuestion = ({ currentGroup, question, feedback, onAnswerClick }) => {
  return (
    <div className="main">
      <div className="info">
        {currentGroup}-{question.no}
      </div>
      <div className="question" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {question.qimage && (
          <img
            src={question.qimage}
            alt=""
            style={{ width: '20vw', height: '20vw', objectFit: 'contain', flexShrink: 0 }}
          />
        )}
        <span>{question.question}</span>
      </div>
      <div className="answer">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerClick(option)}
            className="option"
          >
            <img
              src={option.image}
              alt={option.answer}
              style={{ width: '20vw', height: '20vw' }}
            />
            <span>{option.answer}</span>
            <span style={{ fontSize: '14px', color: '#0044CC' }}>{option.langid}</span>
          </button>
        ))}
      </div>
      <div className="feedback">
        {feedback}
      </div>
    </div>
  );
};

export default QuizQuestion;
