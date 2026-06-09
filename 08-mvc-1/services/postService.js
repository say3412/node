const { Post } = require("../models");

// create
const create = ({ title, content, author }) => {
  return Post.create({ title, content, author });
}

// list
const list = () => {
  return Post.findAll({ order: [["id", "desc"]] });
}

// get
const get = (id) => {
  return Post.findByPk(id);
}

// update
const update = (post, title, content, author) => {
  post.title = title ?? post.title;
  post.title = content ?? post.title;
  post.author = author ?? post.author;

  const updated = post.save();
  return updated;
}


// delete
const remove = (post) => {
  const deleted = post.destroy();
  return deleted;
}

module.exports = { create, list, get, update, remove }