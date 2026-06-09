const express = require("express");
const winston = require("winston");
const app = express();

// 미들웨어
app.use(express.json())// body 사용에 json을 담기위해 필요
let posts = [
  { id: 1, title: "fisrt", content: "안녕하세요", author: "Sole" },
  { id: 2, title: "second", content: "반갑습니다.", author: "Rian" },
  { id: 3, title: "third", content: "감사합니다.", author: "Peter" }
];

let nextId = 4; // new post id

// 목록
app.get("/posts", (req, res) => {
  if (!posts) {
    res.status(404).json({ message: "게시물이 없습니다." });
  }

  res.status(200).json(posts);
});

// 글작성
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    res.json({ message: "title and content are needed!" });
  }

  const id = nextId++;
  const post = { id, title, content, author: author ?? "익명" }
  posts.push(post);

  res.status(201).json(post);
});

// 글 한개
app.get("/posts/:id", (req, res) => {
  id = Number(req.params.id);

  const post = posts.find((p) => p.id === id);
  res.status(200).json(post);
});

// 글 수정
app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, content, author } = req.body;

  const post = posts.find((p) => p.id === id);
  if (!post) res.status(404).json({ message: "수정할 게시물을 찾을 수 없습니다." });
  if (title !== undefined) { post.title = title }
  if (content !== undefined) { post.content = content }
  if (author !== undefined) { post.author = author }

  res.status(201).json(post);
});

// 글 삭제
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({message: "삭제할 게시물을 찾을 수 없습니다."});
  }

  const delpost = posts.splice(index, 1);
  res.status(201).json(delpost);
})

app.listen(3004, () => {
  console.log("3004 port")
})