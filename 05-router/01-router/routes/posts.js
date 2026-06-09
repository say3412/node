const express = require("express");
const router = express.Router(); // 특정 자원을 묶는데 사용

const posts = [
  { id: 1, title: "fisrt", content: "안녕하세요", author: "Sole" },
  { id: 2, title: "second", content: "반갑습니다.", author: "Rian" },
];

// http://localhost:3001/posts
router.get("/", (req, res) => {
  res.json(posts);
});

// http://localhost:3001/posts/:id
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));

  if(!post) {
    res.status(404).json({message: "cannot find the post"});
  }

  res.json(post);
})

module.exports = router;