const API_URL = "https://lcsq4jnuij.execute-api.ap-northeast-1.amazonaws.com/default/ikkohquiz";

export const fetchGroups = async () => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ group: "0" }),
    redirect: 'follow',
  });
  const resjson = await response.json();
  return JSON.parse(resjson.body);
};
