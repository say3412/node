const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "basic_test.db"));

db.exec(`
    create table if not exists posts (
      id integer primary key autoincrement,
      title text not null,
      content text not null,
      author text,
      create_at text default current_timestamp
    )`
);

const insertSql = "insert into posts (title, content, author) values (?, ?, ?)";
const insertPrep = db.prepare(insertSql);
const insertInfo = insertPrep.run("first", "the first content", "Andy");

console.log("insertInfo: ", insertInfo);
console.log("마지막 입력 글 id: ", insertInfo.lastInsertRowid);

const updateSql = "update posts set title = ?";



