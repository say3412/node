const postService = require("../services/postService");

const list = async (req, res) => {
  const list = await postService.list();
  return res.status(200).json(list);
}

const get = async (req, res) => {
  const post = await postService.get(req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "no post found" });
  }

  res.status(200).json(post);
}

const create = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ msg: "title and content are needed." })
  }

  const updated = await postService.create(title, content, author);
  return res.status(201).json(updated);
}

const update = async (req, res) => {
  const post = await postService.get(req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "no post found" });
  }

  const { title, content, author } = req.body;
  const updated = await postService.update(post, title, content, author);
  return res.status(200).json(updated);
}

const remove = async (req, res) => {
  const post = await postService.get(req.params.id);
  if (!post) {
    return res.status(404).json({ msg: "no post found" });
  }

  const removed = await postService.remove(post);
  return res.status(200).json({ msg: removed.title + ": 삭제되었습니다." });
}

module.exports = { list, get, create, update, remove }