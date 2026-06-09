const express = require("express");
const app = express();

app.use(express.json()); // post/put body에 json을 담기 위해서는 이 설정이 필요

const posts = [
  { id: 1, title: "the first", content: "hello:) nice to meet you", author: "Andy" },
  { id: 2, title: "the second", content: "Hi:) nice to meet you", author: "Candy" },
  { id: 3, title: "the third", content: "Wow:) nice to meet you", author: "Cindy" },
];

app.get("/", (req, res) => {
  res.json({ message: "Hello Expresssssss :)" });
});

app.get("/hello", (req, res) => {
  res.send(`
      <html>
        <head>
          <title>Hello World</title>
        </head>
        <body>
          <h1>Hello Express</h1>
          <p>Hello Wordl! Welcome :)</p>
          <a href="/posts"><button>목록</button></a>
        </body>
      </html>
    `);
});

app.get('/posts', (req, res) => {
  const { author } = req.query;
  if (author) {
    const post = posts.filter((f) => (f.author === author));
    res.status(200).json(post);
  } else {
    res.status(200).json(posts);
  }
});

app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((f) => f.id === id);

  if (!post) {
    res.status(404).json({ message: "404 게시물을 찾을 수 없습니다." })
  }

  res.status(200).json(post);
});

let idN = 4;
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  const post = { id: idN++, title, content, author: author || "익명" };
  posts.push(post);

  res.status(201).json(post);
});

app.listen(3003, () => {
  console.log('http://localhost:3003 에서 실행 중...');
})