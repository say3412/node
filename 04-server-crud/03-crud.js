const express = require("express");
const winston = require("winston");
const app = express();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ]
});

// 1. 미들웨어
app.use(express.json()); // post/put body에 json을 담기 위해서는 이 설정이 필요, 아니면 string으로 인식
// 2. 우리의 첫번째 미들웨어
app.use((req, res, next) => {
  console.log(`${req.url} = ${req.method}`);
  next(); // 다음 단계 라우터로 넘어가세요. 만약 호출 안하면 응답이 멈춤
});
// 3. winston 미들웨어
app.use((req, res, next) => {
  logger.info(`${req.url} - ${req.method} - ${res.statusCode}`); // return 되는 값 보다 logger가 먼저 호출되기 때문에 무조건 200, 여기선 의미가 없음, 조작 필요
  next();
})

let posts = [
  { id: 1, title: "fisrt", content: "안녕하세요", author: "Sole" }
];

let nextId = 2; // 새글에 id 부여

// 목록
app.get('/posts', (req, res) => {
  return res.json(posts);
})

// 글작성
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body; // json type

  if (!title || !content) {
    return res.status(400).json({ message: "title and content are needed!" })
  }

  const post = { id: nextId++, title, content, author: author || '익명' };
  posts.push(post);

  res.status(201).json(post)
})


// 글수정
app.put("/posts/:id", (req, res) => {
  // 1. id 에 해당되는 게시글을 가지고 온다.
  const post = posts.find((p) => p.id === Number(req.params.id)); // filter로 하는 경우는 배열로 가져오기 때문에 find가 더 유리
  if (!post) {
    return res.status(404), json({ message: "게시물을 찾을 수 없습니다." });
  }
  // 2. req.body > title, content, author 값을 가져와서 변수에 넣는다.
  const { title, content, author } = req.body;

  if (title !== undefined) { post.title = title; }
  if (content !== undefined) { post.content = content; }
  if (author !== undefined) { post.author = author; }

  console.log(title, content, author);
  res.status(201).json(post);
});

app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  res.status(200).json(post);
})

app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  const [remove] = posts.splice(index, 1); // 해당 게시물 1개만 제거하고 제거한 값을 가져오기
  res.json({ message: "삭제됨", post: remove })
});

app.listen(3005, () => {
  console.log('http://localhost:3005 에 서버가 떴어요~~')
})