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
  const [feedback, setFeedback] = useState(""); // 正解/不正解を表示

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
    if (selectedOption.answer === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback("正解です！");
    } else {
      setFeedback(`不正解です。正解は「${questions[currentQuestion].answer}」です。`);
    }
    
    setTimeout(() => {
      setFeedback(""); // フィードバックをクリア
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000); // m秒後に次の質問に進む
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
      <Header/>
      {showGroupSelect ? (
        <GroupSelect onGroupSelect={handleGroupSelect} />
      ) : showScore ? (
        <QuizResult score={score} total={questions.length} onNext={handleNextClick} />
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