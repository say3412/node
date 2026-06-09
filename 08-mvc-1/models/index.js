const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../boad.db"),
  logging: false
});

const Post = require("./post")(sequelize);

module.exports = { sequelize, Post }