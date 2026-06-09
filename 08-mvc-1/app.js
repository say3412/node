const express = require("express");
const { sequelize } = require("./models");
const postRoute = require("./routes/postRoute")

const app = express();
app.use(express.json());
app.use("/posts", postRoute);

async function main() {
  await sequelize.sync();
  app.listen(3001, () => {
    console.log("3001...");
  });
}

main();