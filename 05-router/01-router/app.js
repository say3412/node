const express = require("express");
const app = express();

app.use(express.json());

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

// http://localhost:3001/posts -> postsRouter
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(3001, () => {
  console.log("3001에서 서버 실행 중...")
})