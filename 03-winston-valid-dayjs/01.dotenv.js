require("dotenv").config();

console.log("서버포트", process.env.PORT);
console.log("DB이름", process.env.DB_NAME);
console.log("API_KEY", process.env.API_KEY);

// .env 에 키가 NODE_ENV 값이 development 넣고 process.env.NODE_ENV 를 출력
console.log("노드환경", process.env.NODE_ENV);

// 개발환경일 경우에는 "개발 환경에서 실행중", "운영환경에서 실행중"
if (process.env.NODE_ENV === "development") {
  console.log("개발 환경에서 실행중");
} else {
  console.log("운영환경에서 실행중");
}



