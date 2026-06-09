const http = require("http"); // Common JS 모듈

const server = http.createServer((req, res) => {
  // 실제 웹서버 로직을 추가
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  console.log("요청 URL: ", req.url);
  console.log("요청 Method: ", req.method);
  console.log("요청 Header: ", req.headers);

  res.end("안녕하세요, 첫번째 노드 웹서버 입니다.")

}); // 이 함수만 호출하면 서버 생성

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
});

