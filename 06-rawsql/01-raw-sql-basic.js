const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "basic.db"));

// db.exec(`
//     CREATE TABLE IF NOT EXISTS posts (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT not null,
//       content TEXT not null,
//       author TEXT,
//       created_at TEXT DEFAULT CURRENT_TIMESTAMP
//     );
//   `);

// console.log("--------- 1. 문자열 조립 방식 쿼리 ---------");
// const title1 = "the first";
// const content1 = "the first content. string"
// const author1 = "Candy";
// const insertSql1 = `
//   insert into posts(title, content, author)
//   values ('${title1}', '${content1}', '${author1}');
// `;
// console.log(insertSql1);
// db.exec(insertSql1);

// const title2 = "the second";
// const content2 = "the second content. string"
// const author2 = "Sandy";
// const insertSql2 = `
//   insert into posts(title, content, author)
//   values ('${title2}', '${content2}', '${author2}');
// `;
// console.log(insertSql2);
// db.exec(insertSql2);

// const allsql = "select * from posts";
// const rows = db.prepare(allsql).all();
// console.log("all select", rows);

// const searchId = 1;
// const onesql = `select * from posts where id = ${searchId}`;
// const row = db.prepare(onesql).get(); // 하나만은 get, 전체는 all
// console.log(row);

// const newTitle = "제목 수정"
// const updateId = 1;
// const updateSql = `update posts set title = '${newTitle}' where id = ${updateId}`;
// db.exec(updateSql);

// const searchId = 1;
// const onesql = `select * from posts where id = ${searchId}`;
// const row = db.prepare(onesql).get(); // 하나만은 get, 전체는 all
// console.log(row);

console.log("--------- 2. preparedstatement ---------");
// $ 쿼리 사용 시 sql injection 발생 위험으로, preparestatement 사용 필수!! (? 로 입력 의미)
// insert
const insert = db.prepare("insert into posts (title, content, author) values (?, ?, ? )");
// const info = insert.run("first", " the first content", "One");

// console.log("info : ", info);
// console.log("content id: ", info.lastInsertRowid);
// console.log("all content", db.prepare("select * from posts").all());

db.prepare("update posts set title = ? where id = ?").run("제목 수정 4를 위한", 4);
const result = db.prepare("select * from posts where id = ?").get(4);
console.log("수정 후 4번 글", result);

// delete 게시글 4번을 삭제하고, 콘솔 전체 게시물을 가져오기
db.prepare("delete from posts where id = ?").run(4);
const result1 = db.prepare("select * from posts").all();
console.log("삭제 후 : ", result1);



