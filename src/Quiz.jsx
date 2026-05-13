import React, { useState, useEffect, useRef } from 'react';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { fetchQuizData } from './api/quizApi.js'
import GroupSelect from './components/GroupSelect.jsx'
import QuizQuestion from './components/QuizQuestion.jsx'
import QuizResult from './components/QuizResult.jsx'

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showGroupSelect, setShowGroupSelect] = useState(true);
  const [feedback, setFeedback] = useState(null); // { selected: option, isCorrect: bool }
  const [stats, setStats] = useState(() => {
    try { return JSON.parse(localStorage.getItem('quizStats') || '{}'); }
    catch { return {}; }
  });
  const incrementedRef = useRef(null);

  useEffect(() => {
    if (currentGroup === null) return;
    fetchQuizData(currentGroup).then(data => {
      setQuestions(data);
      console.log(data);
    });
  }, [currentGroup]);

  useEffect(() => {
    if (!currentGroup || questions.length === 0) return;
    const q = questions[currentQuestion];
    if (!q) return;
    const incrementKey = `${currentGroup}-${currentQuestion}`;
    if (incrementedRef.current === incrementKey) return;
    incrementedRef.current = incrementKey;
    const key = `${currentGroup}-${q.no}`;
    setStats(prev => {
      const cur = prev[key] || { count: 0, correct: 0 };
      const updated = { ...prev, [key]: { ...cur, count: cur.count + 1 } };
      localStorage.setItem('quizStats', JSON.stringify(updated));
      return updated;
    });
  }, [currentQuestion, questions, currentGroup]);

  const handleGroupSelect = (group) => {
    setCurrentGroup(group);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowGroupSelect(false);
    setQuestions([]);
    incrementedRef.current = null;
  };

  const handleAnswerOptionClick = (selectedOption) => {
    const isCorrect = selectedOption.answer === questions[currentQuestion].answer;
    if (isCorrect) setScore(score + 1);
    const key = `${currentGroup}-${questions[currentQuestion].no}`;
    setStats(prev => {
      const cur = prev[key] || { count: 1, correct: 0 };
      const updated = { ...prev, [key]: { ...cur, correct: cur.correct + (isCorrect ? 1 : 0) } };
      localStorage.setItem('quizStats', JSON.stringify(updated));
      return updated;
    });
    setFeedback({ selected: selectedOption, isCorrect });

    setTimeout(() => {
      setFeedback(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleNextClick = () => {
    setShowGroupSelect(true);
    setCurrentGroup(null);
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setQuestions([]);
    incrementedRef.current = null;
  };

  const currentStats = currentGroup && questions[currentQuestion]
    ? stats[`${currentGroup}-${questions[currentQuestion].no}`] || { count: 0, correct: 0 }
    : null;

  return (
    <div className="container">
      <Header onBack={showGroupSelect ? null : handleNextClick} />
      {showGroupSelect ? (
        <GroupSelect onGroupSelect={handleGroupSelect} />
      ) : showScore ? (
        <QuizResult score={score} total={questions.length} onNext={handleNextClick} currentGroup={currentGroup} />
      ) : questions.length > 0 ? (
        <QuizQuestion
          currentGroup={currentGroup}
          question={questions[currentQuestion]}
          feedback={feedback}
          onAnswerClick={handleAnswerOptionClick}
          questionStats={currentStats}
        />
      ) : (
        <p>クイズを読み込み中...</p>
      )}
    <Footer/>
    </div>
  );
};

export default QuizApp;
