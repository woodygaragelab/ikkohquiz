const API_URL = "https://lcsq4jnuij.execute-api.ap-northeast-1.amazonaws.com/default/ikkohquiz";

const generateOptions = (correctQuestion, allQuestions) => {
  const shuffled = allQuestions
    .filter(q => q !== correctQuestion)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  return [...shuffled, correctQuestion].sort(() => 0.5 - Math.random());
};

export const fetchGroups = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ group: "0" }),
    redirect: 'follow'
  };

  const response = await fetch(API_URL, requestOptions);
  const resjson = await response.json();
  return JSON.parse(resjson.body);
};

export const fetchQuizData = async (group) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ group: String(group) }),
    redirect: 'follow'
  };

  const response = await fetch(API_URL, requestOptions);
  const resjson = await response.json();
  const bodyjson = JSON.parse(resjson.body);

  return bodyjson.map(q => ({
    no: q.no,
    question: q.question,
    image: q.image,
    qimage: q.qimage,
    answer: q.answer,
    options: generateOptions(q, bodyjson)
  }));
};
