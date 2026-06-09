const express = require("express");
const joi = require("joi");
const app = express();

app.use(express.json());

const createPostSchema = joi.object({
  title: joi.string().min(2).max(5).required(),
  content: joi.string().min(3).max(5).required(),
  author: joi.string(),
});

function validatee(schema) {
  return (req, res, next) => {
    const { error } = schema.validatee(req.body);

    if (error) {
      return res.status(400).json({
        message: "입력 값이 올바르지 않습니다.",
        details: error.details[0].message,
      })
    }
    next();
  }
}

const posts = [];
let nextId = 1;

app.post("/posts", validatee(createPostSchema), (req, res) => {
  const { title, content, author } = req.body;
  const post = { id: nextId++, title, content, author };
  posts.push(post);
  res.status(200).json(post);
});

app.listen(3002, () => {
  console.log("3002...");
})