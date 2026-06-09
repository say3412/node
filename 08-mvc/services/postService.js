const { Post } = require("../models");

// 목록
const list = () => {
  return Post.findAll({ order: [["id", "desc"]] });
}

// 글작성
const create = ({ title, content, author }) => {
  return Post.create({ title, content, author })
}

// 상세 조회
const get = (id) => {
  return Post.findByPk(id);
}

// 수정
const update = (post, title, content, author) => {
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  post.author = author ?? post.author;
  post.save();

  return post;
}

// 삭제
const remove = (post) => {
  post.destroy();

  return;
}

module.exports = { list, create, get, update, remove }