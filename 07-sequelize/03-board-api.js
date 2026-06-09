// npm i nodemon 코드가 바뀌면 자동으로 서버 재시작
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const app = express();
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "board.db"),
  logging: false
});

const Post = sequelize.define("Post", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  author: { type: DataTypes.STRING },
});

async function main() {
  await sequelize.sync();  // model creating...
  app.listen(3001, () => console.log("3001..."));
}

// async 를 꼭!! 넣어야 함!!
// 글작성
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(404).json({ msg: "title and content are needed!" });
  }

  const post = await Post.create({ title, content, author });
  res.status(201).json(post);
});

// 전체 가져오기
app.get("/posts", async (req, res) => {
  const posts = await Post.findAll({
    order: [["id", "desc"]]
  });
  if (!posts) {
    return res.status(404).json({ msg: "no posts found" });
  }

  res.status(200).json(posts);
});

// 상세 페이지
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ msg: "no post found" });

  res.status(200).json(post);
});

// 업데이트
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ msg: "no post found" });

  const { title, content, author } = req.body;
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.author = author ?? post.author;

  const info = await post.save();
  console.log("info", info.title);
  res.status(200).json(await Post.findByPk(id));
});

// delete
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ msg: "no post found" });

  // const deleted = await Post.destroy({ where: { id: id } });
  const deleted = await post.destroy();

  res.status(200).json(deleted.title + ": 삭제 되었습니다.");
});

main();