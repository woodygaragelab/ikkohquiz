import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (currentGroup === null) return;
    fetchQuizData(currentGroup).then(data => {
      setQuestions(data);
      console.log(data);
    });
  }, [currentGroup]);

  const handleGroupSelect = (group) => {
    setCurrentGroup(group);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowGroupSelect(false);
    setQuestions([]);
  };

  const handleAnswerOptionClick = (selectedOption) => {
    const isCorrect = selectedOption.answer === questions[currentQuestion].answer;
    if (isCorrect) setScore(score + 1);
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
  };

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
        />
      ) : (
        <p>クイズを読み込み中...</p>
      )}
    <Footer/>
    </div>
  );
};

export default QuizApp;