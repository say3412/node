const fs = require("fs").promises;
const path = require("path");

const dog = {
  name: 'JuJu',
  puppy: 'cute puppy'
}

const dirPath = path.join(__dirname, "temp");
const filePath = path.join(dirPath, "jwt.json");
// console.log(dirPath);
async function createFile() {
  await fs.mkdir(dirPath, {recursive: true});
  await fs.writeFile(filePath, JSON.stringify(dog));
  const content = await fs.readFile(filePath, "utf-8");
  console.log(content, typeof content);

  const contentJ = JSON.parse(content);
  console.log(contentJ, typeof contentJ);
}
createFile()
console.log("먼저 나오니?");

