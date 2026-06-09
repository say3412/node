// 관계 설정
// 사용자, 게시글, 댓글

const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "relations.db"),
  logging: true
});

const User = sequelize.define("User", { name: DataTypes.STRING });
const Post = sequelize.define("Post", { title: DataTypes.STRING, content: DataTypes.TEXT });
const Comment = sequelize.define("Comment", { content: DataTypes.TEXT });

User.hasMany(Post); // users 1: posts N
Post.belongsTo(User); // users 1: posts N

Post.hasMany(Comment);
Comment.belongsTo(Post);

async function main() {
  // await sequelize.sync({ force: true });
  await sequelize.sync();

  let post;
  const user1 = await User.create({ name: "Andy" });
  post = await Post.create({ title: "the first", content: "the first content, thank you", UserId: user1.id });

  await Comment.create({ content: "good!", PostId: post.id });
  await Comment.create({ content: "have a good day!", PostId: post.id });
  await Comment.create({ content: "thank you!", PostId: post.id });

  const result = await Post.findByPk(post.id,  {
    include: [User, Comment] // join
  });
  // console.log(result.title, result.User, result.Comment);
  // console.log(result.toJSON());

  // quiz 1. 모든 게시글을 가지고 오는데, 게시글의 작성자와, 댓글을 같이 출력
  const result1 = await Post.findAll({
    include: [User, Comment]
  });
  console.log(result1.map((p) => p.toJSON()));

  const user2 = User.findByPk(1, {
    include: [{model: Post}]
  });
  console.log(user2);

}

main();
