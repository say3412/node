const { Sequelize, DataTypes, Op } = require("sequelize");
const path = require("path");

// sequelize orm 생성
const sequelize = new Sequelize({
  dialect: "sqlite", // 방언
  storage: path.join(__dirname, "basics-test.db"),
  logging: true,
});

// 모델 (테이블) 만들기
const Post = sequelize.define("Post", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  author: { type: DataTypes.STRING },
});

async function main() {
  await sequelize.sync();

  // insert == create
  // await Post.create({ title: "the first", content: "the first morning, so happy!", author: "Lala" });
  // await Post.create({ title: "the second", content: "the second morning, so energenic!", author: "Edwin" });
  // await Post.create({ title: "the third", content: "already third morning, let's go!", author: "Gina" });

  // select
  const all = await Post.findAll();
  // all.forEach((a) => console.log(a.title, a.content, a.author));

  const one = await Post.findByPk(1);
  console.log(one.title, one.content, one.author);

  // update
  const post = await Post.findByPk(1);
  post.title = "The One";
  post.save();
  console.log("The One: ", (await Post.findByPk(1)).title);

  // destory
  const destoried = await Post.destroy({ where: { title: "the third" } });
  console.log("destoried count: ", destoried); // 삭제한 개수
  console.log("after destoried, count all: ", await Post.count()); // 전체 남은 개수

  // bulk insert
  // const bulk = await Post.bulkCreate([
  //   { title: "Node.js 입문", content: "Node 연습", author: "조주아" },
  //   { title: "Express 입문", content: "Express 연습", author: "이사라" },
  //   { title: "Nest.js 입문", content: "Next 연습", author: "조수아" },
  // ]);

  // select ... where
  const byAuthor = await Post.findAll({ where: { author: "Lala" } });
  // console.log(byAuthor.map((p) => console.log(p.title, p.content, p.author)));

  // select .. where .. like
  const titleLike = await Post.findAll({
    where: { title: { [Op.like]: "%first%" } },
  });
  console.log(titleLike.map((p) => console.log(p.title, p.content, p.author)));

  // select .. where .. order by .. limit
  const andCond = await Post.findAll({
    where: {
      [Op.and]: [{ title: { [Op.like]: "%js%" } }, { author: "조주아" }],
    },
  });
  console.log(andCond.map((p) => console.log(p.title, p.content, p.author)));
}

main();
