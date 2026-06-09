const express = require("express");
const { sequelize, Post } = require("./models");
const postRoutes = require("./routes/postRoute");

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);

async function main() {
  await sequelize.sync();
  app.listen(3001, () => {
    console.log("3001 서버 실행 중...");
  });
}

main();