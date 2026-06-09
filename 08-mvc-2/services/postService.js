const { Post } = require("../models");

const list = () => {
  return Post.findAll();
}

const get = (id) => {
  return Post.findByPk(id);
}

const create = (title, content, author) => {
  const post = Post.create({ title, content, author });
  return post;
}

const update = (post, title, content, author) => {
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.author = author ?? post.author;

  return post.save();
}

const remove = (post) => {
  return post.destroy();
}

module.exports = { list, get, create, update, remove }