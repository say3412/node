const express = require("express");
const { sequelize } = require("./models");
const postRouter = require("./routes/postRouter");

const app = express();
app.use(express.json());
app.use("/posts", postRouter);

async function main() {
  await sequelize.sync();
  app.listen(3001, () => {
    console.log("3001...");
  });
}

main();