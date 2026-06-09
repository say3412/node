const { Sequelize, DataTypes, Op } = require("sequelize");
const path = require("path");

// npm i sqlite3

// sequelize orm 객체 생성
const sequelize = new Sequelize({
  // 정보를 넣으면 orm 객체가 생성
  dialect: "sqlite",
  storage: path.join(__dirname, "basics.db"),
  logging: true, // 변환된 sql을 콘솔 로그에서 확인 가능
});

// 테이블 == 모델 을 만들어야 함
// 모델 orm
const Post = sequelize.define("Post", {
  // 컬럼 속성
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  author: { type: DataTypes.STRING },
});

async function main() {
  await sequelize.sync(); // == sync({force:false}) : 안전모드 (데이터베이스에 테이블이 없을 때만 새로 만듬)

  // insert == create
  // (INSERT INTO `Posts` (`id`,`title`,`content`,`author`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);)
  // await Post.create({title: "첫번째 글", content: "안녕하세요~~", author: "Andy"});
  // await Post.create({title: "두번째 글", content: "안녕하세요, 반갑습니다", author: "Ben"});
  // await Post.create({title: "세번째 글", content: "안녕하세요, 감사합니다.", author: "Cathy"});
  // await Post.create({title: "네번째 글", content: "감사합니다. 반가워요!", author: "Danny"});

  // select
  const all = await Post.findAll(); // select * from Posts
  all.forEach((a) => {
    // console.log(a.title, a.content, a.author);
  });

  const first = await Post.findByPk(1); // SELECT * FROM Posts WHERE id = 1;
  // console.log(first);
  // console.log(first.title, first.content, first.author);

  // update
  const post = await Post.findByPk(1);
  post.title = "the first";
  await post.save();
  console.log("수정된 내용: ", (await Post.findByPk(1)).title);

  // destroy == delete
  await Post.destroy({ where: { id: 2 } });
  console.log("삭제된 후 전체글 수: ", await Post.count());

  // bulk insert
  // INSERT INTO `Posts` (`id`,`title`,`content`,`author`,`createdAt`,`updatedAt`)
  // VALUES
  //   (NULL,'Node.js 입문','Node 연습','조주아','2026-06-09 02:10:03.923 +00:00','2026-06-09 02:10:03.923 +00:00'),
  //   (NULL,'Express 입문','Express 연습','이사라','2026-06-09 02:10:03.923 +00:00','2026-06-09 02:10:03.923 +00:00'),
  //   (NULL,'Nest.js 입문','Next 연습','조수아','2026-06-09 02:10:03.923 +00:00','2026-06-09 02:10:03.923 +00:00')
  // await Post.bulkCreate([
  //   {title: "Node.js 입문", content: "Node 연습", author: "조주아"},
  //   {title: "Express 입문", content: "Express 연습", author: "이사라"},
  //   {title: "Nest.js 입문", content: "Next 연습", author: "조수아"},
  // ]);

  // select ... where
  // select * from Posts where author = ?
  const byAuthor = await Post.findAll({ where: { author: "Andy" } });
  console.log(byAuthor);

  const likeTitle = await Post.findAll({
    where: { title: { [Op.like]: "%Express%" } },
  });
  console.log(
    "Op.like: ",
    likeTitle.map((p) => p.title),
  );

  // select 컬럼 ... 기타 조건
  // select id, title from Posts order by id asc limit 1
  const titleOnly = await Post.findAll({
    attributes: ["id", "title"], // id와 title 컬럼만!
    order: [["id", "ASC"]],
    limit: 1,
  });
  console.log(
    "titleOnly: ",
    titleOnly.map((p) => p.toJSON()),
  );

  // select 처음 걸리는 하나만 가져옴
  const one = await Post.findOne({
    where: { author: "Danny" },
    oerder: [["id", "ASC"]],
  });
  console.log("one: ", one.toJSON());

  // update ... where
  const [affected] = await Post.update(
    { author: "Edwin" },
    { where: { author: "Cathy" } },
  );
  console.log(affected);

  // raw query
  const rawRow = await sequelize.query(
    "select id, title, author from Posts where author = :author",
    {
      replacements: { author: "Edwin" },
      type: Sequelize.QueryTypes.SELECT, // select 결과를 배열로
    },
  );
  console.log("raw sql: ", rawRow);

  // select ... in
  const inIds = await Post.findAll({
    where: { id: { [Op.in]: [1, 3, 5] } },
  });
  console.log(
    "inIds: ",
    inIds.map((p) => p.toJSON()),
  );

  const andCond = await Post.findAll({
    where: {
      [Op.and]: [
        { author: "Edwin" },
        { title: { [Op.like]: "%세번째%" } },
        { content: { [Op.like]: "%감사합니다%" } },
      ],
    },
  });
  console.log(
    "andCond: ",
    andCond.map((p) => p.toJSON()),
  );
}

main();
