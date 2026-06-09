const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");
const winston = require("winston");
const joi = require("joi"); // 스키마 기반 검증
require("winston-daily-rotate-file");

const app = express();

// 로그
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} - [${level}] - ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'log/%DATE%_app_board.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxsize: '10m',
      maxFiles: '14d' // 로그 보관 기간
    })
  ]
});

// 글쓰기 입력 값 검증
const createPostSchema = joi.object({
  title: joi.string().min(2).max(10).required(),
  content: joi.string().min(8).max(15).required(),
  author: joi.string(),
});
// 글쓰기 수정 값 검증
const updatePostSchema = joi.object({
  title: joi.string().min(2).max(10),
  content: joi.string().min(8).max(15),
  author: joi.string(),
});

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: "입력 값이 올바르지 않습니다.",
        details: error.details[0].msg,
      });
    }
    next();
  }
}

// 미들웨어
// 1. body json 사용
app.use(express.json());
// 2. 콘솔 로그
// app.use((req, res, next) => {
//   console.log(`${req.url} - ${req.method}`);
//   next();
// })
// 3. winston 미들웨어
app.use((req, res, next) => {
  logger.info(`${req.url} - ${req.method}`);
  next();
})

const db = new Database(path.join(__dirname, "board.db"));

db.exec(`
    create table if not exists posts (
    id integer primary key autoincrement,
    title text not null,
    content text not null,
    author text,
    create_at text default current_timestamp
    );
  `)

// 1. 글쓰기
app.post("/posts", validate(createPostSchema), (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) return res.status(400).json({ msg: "제목과 내용은 필수 입니다." });

  const insert = db.prepare("insert into posts (title, content, author) values (?, ?, ?)");
  const insertInfo = insert.run(title, content, author || "익명");
  console.log("insert Info: ", insertInfo);
  console.log("last inserted id :", insertInfo.lastInsertRowid);

  const created = db.prepare("select * from posts where id = ?").get(insertInfo.lastInsertRowid);
  res.status(200).json(created);
});

// 2. 목록
app.get("/posts", (req, res) => {
  const selectAll = db.prepare("select * from posts order by id desc").all();
  console.log(selectAll);

  res.status(200).json(selectAll);
})

// 3. 상세
app.get("/posts/:id", (req, res) => {
  const selectOne = db.prepare("select * from posts where id = ?").get(req.params.id); // number 변환 불필요

  if (!selectOne) {
    return res.status(404).json({ msg: "요청하신 게시물을 찾을 수 없습니다." });
  }

  console.log(selectOne);
  res.status(200).json(selectOne);
})


// // 4. 수정: 수정하는 컬럼만 update
app.put("/posts1/:id", validate(updatePostSchema), (req, res) => {
  const id = Number(req.params.id);
  const { title, content, author } = req.body;
  let update = "update posts set ";
  const query = " where id = ?";
  let runPram = {};

  if (title !== undefined) {
    update = update.concat("title = ? ,");
    runPram.title = title;
  }
  if (content !== undefined) {
    update = update.concat("content = ? ,");
    runPram.content = content;
  }
  if (author !== undefined) {
    update = update.concat("author = ? ");
    runPram.author = author;
  }

  if (update.endsWith(",")) {
    update = update.slice(0, -1);
  }

  update = update.concat(query);
  console.log("update: ", update);
  console.log("runPram: ", runPram);

  db.prepare(update).run(...Object.values(runPram), id);
  const result = db.prepare("select * from posts where id = ?").get(id);
  runPram = {};

  res.status(200).json(result);
});

// 수정 2 : 일반 버전
app.put("/posts/:id", validate(updatePostSchema), (req, res) => {
  const id = req.params.id;
  const post = db.prepare("select * from posts where id = ?").get(id);
  if (!post) {
    return res.status(404).json({ msg: "요청하신 게시물을 찾을 수 없습니다." });
  }

  let { title, content, author } = req.body;

  const uptTtle = title ?? post.title;
  const upContent = content ?? post.content;
  const upAuthor = author ?? post.author;

  const info = db.prepare("update posts set title = ?, content = ?, author = ? where id = ?").run(uptTtle, upContent, upAuthor, id);
  console.log(info);

  res.status(200).json(db.prepare("select * from posts where id = ?").get(id));
});

// 강사님 코드
// app.put("/posts2/:id", (req, res)=>{
//     const post = db.prepare("select * from posts where id = ? ").get(req.params.id)
//     if(!post){
//         return res.status(404).json({message: "게시글을 찾을 수가 없습니다."})
//     }
//     const {title, content, author} = req.body;
//     if(title !== undefined) post.title = title;
//     if(content !== undefined) post.content = content;
//     if(author !== undefined) post.author = author;

//     db.prepare("update posts set title = ? , content = ?, author = ? where id = ?")
//         .run(title, content, author, req.params.id);

//     res.json(db.prepare("select * from posts where id = ? ").get(req.params.id))
// });

// 5. 삭제
app.delete("/posts/:id", (req, res) => {
  const post = db.prepare("delete from posts where id = ?").run(req.params.id);

  if (!post) {
    return res.status(404).json(post);
  }

  res.status(201).json(post);
});

app.listen(3010, () => {
  console.log("3010...");
})