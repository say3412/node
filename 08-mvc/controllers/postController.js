const postService = require("../services/postService");

const list = async (req, res) => {
  const result = await postService.list();
  res.json(result);
}

const create = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(404).json({ msg: "title and content are needed!" })
  }
  const post = await postService.create({ title, content, author });
  res.status(201).json(post);
}

const get = async (req, res) => {
  const post = await postService.get(req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "no post found." });
  }

  res.status(200).json(post);
}

const update = async (req, res) => {
  const post = await postService.get(req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "no post found." });
  }

  const { title, content, author } = req.body;
  const updatePost = await postService.update(post, title, content, author);
  res.status(200).json(updatePost);
}

const remove = async (req, res) => {
  const id = req.params.id;
  const post = await postService.get(id);
  if (!post) {
    return res.status(404).json({ msg: "no post found." });
  }

  await postService.remove(post);
  res.status(200).json(post.title + " 게시물이 삭제되었습니다.");
}

module.exports = { list, create, get, update, remove }