// 不要
// export const fetchQuizData = async () => {
//     try {
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       var raw = JSON.stringify({"filename":"ikkohquiz"});
//       var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
//       fetch("https://lcsq4jnuij.execute-api.ap-northeast-1.amazonaws.com/default/ikkohquiz", requestOptions)
//       .then(response => response.json())
//       .then(resjson  => resjson.body)
//       .then(body     => JSON.parse(body))
//       .then(data     => {
//         return data.map(q => ({
//           question: q.question,
//           image: q.image, // APIが画像URLを返す前提
//           answer: q.answer,
//           options: generateOptions(q.answer, data.map(item => item.answer))
//         }));
//       });
//     } catch (error) {
//       console.error("Error fetching quiz data:", error);
//       return [];
//     }
//   };
  
//   const generateOptions = (correctAnswer, allAnswers) => {
//     const shuffledAnswers = allAnswers
//       .filter(answer => answer !== correctAnswer) // 正解を除外
//       .sort(() => 0.5 - Math.random()) // ランダムに並び替え
//       .slice(0, 2); // 2つ選択
//     return [...shuffledAnswers, correctAnswer].sort(() => 0.5 - Math.random()); // 正解を含めて再度ランダム化
//   };
  