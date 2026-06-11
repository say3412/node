//  npm i jsonwebtoken

const jwt = require("jsonwebtoken");
const screat = "1Si0EL[@8h8^"; // .env에 숨김 // 생성 https://www.lastpass.com/features/password-generator
const token = jwt.sign({ id: 1, name: "Kim", lvl: 3 }, screat, {
  expiresIn: "1h",
}); // ({payload},,{}) 위변조가 되지 않았으면 payload를 꺼내줌

const payload = jwt.verify(token, screat);
console.log('토큰: ', token);
console.log("페이로드: ", payload);

const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IktpbSIsImx2bCI6MywiaWF0IjoxNzgxMDY4Njc2LCJleHAiOjE3ODEwNzIyNzZ9.5Niwpfj6RA9k8YUOG29WJIemK5-at5dnGhz0xtF5yGA1";
try {
  jwt.verify(token1, screat);
} catch (e) {
  console.log("위변조 토큰 거부: ", e.message);
}