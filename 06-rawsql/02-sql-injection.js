const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "sql-injection.db"));

db.exec(
  `
  create table if not exists posts(
    id integer primary key autoincrement,
    title text,
    content text,
    author text
  );`,
);


// arg는 꼭 ? 로 전달해야한다. string으로 하면 아래와 같이 true 값으로 다른 sql 실행가능
const count = db.prepare("select count(*) as n from posts").get().n;
if (count === 0) {
  const insert = db.prepare(
    "insert into posts (title, content, author) values (?, ?, ?)",
  );
  insert.run("공개된 글", "공개된 글 입니다. 안녕하세요", "하니");
  insert.run("또 공개된 글", "또 공개된 글 입니다. 안녕하세요", "두리");
  insert.run("비밀 글", "비밀 글 입니다. 안녕하세요", "관리자");
}

// node 02-sql.injection.js "하니"
// process.argv[0]: Node.js 프로그램 실행 경로
// process.argv[1]: 실행 중인 JS 파일의 경로
// process.argv[2]: 사용자가 직접 입력한 첫 번째 값 ("민지")
const input = process.argv[2] || "하니";
console.log(input);

//  node 02-sql-injection.js "' or '1'='1"
function badQuery(author) {
  const sql = `select * from posts where author = '${author}'`;
  console.log("위험한 sql: ", sql);
  return db.prepare(sql).all();
}

try {
  console.log("위험한 결과: ", badQuery(input));
} catch (e) {
  console.error(e);
}
