import React, { useState, useEffect } from 'react';
// import { fetchQuizData } from './FetchQuizData';
import Header from './Header.jsx'
import Footer from './Footer.jsx'

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
        // options: generateOptions(q.answer, bodyjson.map(item => item.answer))
        options: generateOptions(q, bodyjson)
      }));
      setQuestions(data);
    }
    fetchData();
  }, []);

  const generateOptions = (correctAnswer, allAnswers) => {
    const shuffledAnswers = allAnswers
      .filter(answer => answer !== correctAnswer) // 正解を除外
      .sort(() => 0.5 - Math.random()) // ランダムに並び替え
      .slice(0, 3); // 不正解を3つ選択し、4択にする
    return [...shuffledAnswers, correctAnswer].sort(() => 0.5 - Math.random()); // 正解を含めて再度ランダム化
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
    }, 1000); // 2秒後に次の質問に進む
  };

  return (
    // <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '100%' }}>
    <div class="container">
      <Header/>
      {showScore ? (
        <div>
          <h1>クイズ結果</h1>
          <p>正解数: {score} / {questions.length}</p>
        </div>
      ) : questions.length > 0 ? (
        <div class="main">
          {/* <h1 style={{ fontSize: '96px', textAlign: 'center', width: '100%' }}>{questions[currentQuestion].question}</h1> */}
          <div class="question">
            {/* <h1> */}
              {questions[currentQuestion].question}
            {/* </h1> */}
          </div>
          {/* <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', // 2列
              gap: '10px',                          // カード間の余白
              maxWidth: '400px',                    // 最大幅の例
              margin: '0 auto',                     // 中央寄せ
              textAlign: 'center'                   // テキスト中央寄せ（必要に応じて）
            }}
          > */}
          <div class="answer">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                style={{
                  padding: '20px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '24px', // 文字を大きくする
                  textAlign: 'center'
                }}
            >
              <img
                src={option.image} // オプションに対応する画像
                alt={option.answer}
                // style={{ width: '200px', height: '200px' }}
                style={{ width: '30vw', height: '200px' }}
                
              />
              <span>{option.answer}</span>
              <span style={{ fontSize: '14px', color: '#0044CC' }}>{option.langid}</span>
            </button>
            ))}
          </div>
          <div class="feedback">
            {feedback}
          </div>
          {/* {feedback && (
            <p style={{ marginTop: '20px', fontWeight: 'bold', color: feedback === "正解です！" ? "green" : "red" }}>
              {feedback}
            </p>
          )} */}
        </div>
      ) : (
        <p>クイズを読み込み中...</p>
      )}
    <Footer/>
    </div>
  );
};

export default QuizApp;