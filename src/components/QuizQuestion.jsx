const getQuestionFontSize = (text) => {
  const len = text.length;
  if (len <= 15) return 'clamp(1.4rem, 5vw, 2rem)';
  if (len <= 30) return 'clamp(1.1rem, 4vw, 1.6rem)';
  if (len <= 50) return 'clamp(0.9rem, 3.5vw, 1.3rem)';
  return 'clamp(0.7rem, 3vw, 1rem)';
};

const QuizQuestion = ({ currentGroup, question, feedback, onAnswerClick }) => {
  return (
    <div className="main">
      <div className="info">
        {currentGroup}-{question.no}
      </div>
      <div className="question" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px' }}>
        {question.qimage && (
          <img
            src={question.qimage}
            alt=""
            style={{ width: 'clamp(60px, 18vw, 140px)', height: 'clamp(60px, 18vw, 140px)', objectFit: 'contain', flexShrink: 0 }}
          />
        )}
        <span style={{ fontSize: getQuestionFontSize(question.question), lineHeight: 1.4, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{question.question}</span>
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
