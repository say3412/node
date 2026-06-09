const express = require("express");
const router = express.Router();

const comments = [
  {id: 1, postId:1 , content: "좋은 글 감사합니다."},
  {id: 2, postId:1 , content: "감사합니다."},
];

router.get("/", (req, res) => {
  res.json(comments);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find((c) => c.id === id);

  if(!comment) {
    return res.status(404).json({message: "댓글을 찾을 수 없습니다."});
  }

  res.status(200).json(comment);
})

router.get("/postId/:id", (req, res) => {
  const postId = Number(req.params.id);
  const comment = comments.filter((c) => c.postId === postId);
  
  if(!comment || comment.length === 0) {
    return res.status(404).json({message: "해당 게시글의 댓글이 없습니다."})
  }

  res.status(200).json(comment);
})

module.exports = router;