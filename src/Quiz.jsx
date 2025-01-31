import React, { useState, useEffect } from 'react';
// import { fetchQuizData } from './FetchQuizData';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState(""); // 正解/不正解を表示

  useEffect(() => {
    // API (ikkohquiz) からquizdatを取得する。
    async function fetchData() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // var raw = JSON.stringify({"filename":"ikkohquiz"});
      var raw = JSON.stringify({});
      var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
      const response = await fetch("https://lcsq4jnuij.execute-api.ap-northeast-1.amazonaws.com/default/ikkohquiz", requestOptions)
      const resjson = await response.json();
      const body = resjson.body;
      const bodyjson = JSON.parse(body);
      const data = bodyjson.map(q => ({
        question: q.question,
        image: q.image, // S3のimage fileへのpresigned URL
        answer: q.answer,
        options: generateOptions(q.answer, bodyjson.map(item => item.answer))
      }));
      setQuestions(data);
    }
    fetchData();
  }, []);

  const generateOptions = (correctAnswer, allAnswers) => {
    const shuffledAnswers = allAnswers
      .filter(answer => answer !== correctAnswer) // 正解を除外
      .sort(() => 0.5 - Math.random()) // ランダムに並び替え
      .slice(0, 2); // 2つ選択
    return [...shuffledAnswers, correctAnswer].sort(() => 0.5 - Math.random()); // 正解を含めて再度ランダム化
  };

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
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
    }, 2000); // 2秒後に次の質問に進む
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {showScore ? (
        <div>
          <h1>クイズ結果</h1>
          <p>正解数: {score} / {questions.length}</p>
        </div>
      ) : questions.length > 0 ? (
        <div>
          <h1>{questions[currentQuestion].question}</h1>
          <img
            src={questions[currentQuestion].image}
            alt="question"
            style={{ width: '100%', maxWidth: '400px', margin: '20px 0' }}
          />
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                style={{
                  display: 'block',
                  margin: '10px 0',
                  padding: '10px 20px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <p style={{ marginTop: '20px', fontWeight: 'bold', color: feedback === "正解です！" ? "green" : "red" }}>
              {feedback}
            </p>
          )}
        </div>
      ) : (
        <p>クイズを読み込み中...</p>
      )}
    </div>
  );
};

export default QuizApp;