const express = require("express")
const app = express();

const posts = [
  { id: 1, title: "the first", content: "hello:) nice to meet you", author: "Andy" },
  { id: 2, title: "the second", content: "Hi:) nice to meet you", author: "Candy" },
  { id: 3, title: "the third", content: "Wow:) nice to meet you", author: "Cindy" },
]
// app.get("/posts", (req, res) => {
//   res.json(posts);
// });

// http://localhost:3003/posts?author=Candy
app.get("/posts", (req, res) => {
  const { author } = req.query;
  const { title } = req.query;
  console.log(author, title);

  let postArr;
  if (author) {
    postArr = posts.filter((p) => (p.author === author));
  }

  if (title) {
    postArr = posts.filter((p) => p.title === title);
  }

  if (!author && !title) {
    postArr = posts;
  }
  
  return res.json(postArr);
});

app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ mesaage: "게시물을 찾을 수 없습니다." })
  }
  res.status(200);
  res.json(post);
})

app.listen(3003, () => {
  console.log('3003번에서 실행 중');
});