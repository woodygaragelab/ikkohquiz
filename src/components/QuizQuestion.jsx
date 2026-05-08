const getQuestionFontSize = (text) => {
  const len = text.length;
  if (len <= 5)  return 'clamp(3rem, 10vw, 4.5rem)';
  if (len <= 15) return 'clamp(2.2rem, 7vw, 3rem)';
  if (len <= 30) return 'clamp(1.8rem, 6vw, 2.4rem)';
  if (len <= 50) return 'clamp(1.4rem, 5vw, 2rem)';
  return 'clamp(1.1rem, 4vw, 1.6rem)';
};

const getOptionBorderStyle = (option, question, feedback) => {
  if (!feedback) return {};
  if (option.answer === feedback.selected.answer) {
    return { border: `6px solid ${feedback.isCorrect ? '#4ade80' : '#f87171'}`, borderRadius: '8px' };
  }
  if (!feedback.isCorrect && option.answer === question.answer) {
    return { border: '6px solid #4ade80', borderRadius: '8px' };
  }
  return {};
};

const QuizQuestion = ({ currentGroup, question, feedback, onAnswerClick }) => {
  return (
    <div className="main">
      <div className="info" style={{ fontSize: '0.75rem' }}>
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
            onClick={() => !feedback && onAnswerClick(option)}
            className="option"
            style={{ outline: 'none', ...getOptionBorderStyle(option, question, feedback) }}
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
    </div>
  );
};

export default QuizQuestion;
