const path = require("path");
const fs = require("fs");

// console.log(__dirname, __filename);

// path.join 은 경로를 os별로 자동으로 / \ 를 붙여서 만들어줌
// const sampleDir = path.join(__dirname, "samples", "test.json");
// const sampleDir = path.join(__dirname, "samples");
const sampleDir = path.join(__dirname, "samples", "samples1", "samples2", "test.json");
console.log(sampleDir, typeof sampleDir);

// 디렉토리 만들기
const dirName = path.join(__dirname, "parent", "child");
console.log(dirName);

fs.mkdirSync(dirName, { recursive: true });

// 현재 디렉토리 밑에 02/samples/files/token/jwt.json
// // path.join 을 이용해서 만들어 보세요.
// const tokenDir = path.join(__dirname, "samples", "files", "token", "jwt.json");
// const tokenDir = path.join(__dirname, "samples/files/token/jwt.json");
// console.log(tokenDir);

const jwtObj = {
  token: "11111", expiredAt: "2026-06-04"
}
// // 3. 이 파일을 생성하고 여기에 객체 삽입
// async function createDirectory() {
//   await fs.mkdir(tokenDir, { recursive: true });
// }

// async function getjwt() {
//   await createDirectory();

//   fs.writeFileSync(tokenDir, JSON.stringify(jwtObj));
// }

// 4. samples/files/token/jwt.json 파일을 읽어서 내용을 jwtOjb2로 저장하고, 그 객체의 token 정보를 출력
// const dirToken = path.join(__dirname, 'samples/files/token');
// const fileToken = path.join(dirToken, 'jwt.json');
// fs.mkdirSync(dirToken, { recursive: true });
// fs.writeFileSync(fileToken, JSON.stringify(jwtObj));

// const jwtOjb2 = fs.readFileSync(fileToken, "utf-8");
//console.log(JSON.parse(jwtOjb2).token);

// test 3 + 최종 정리
const fss = require('fs').promises;
async function createToken3() {
  const dirToken = path.join(__dirname, 'sample3', 'files', 'token');
  const fileToken = path.join(dirToken, 'jwt3.json');
  try {
    await fss.mkdir(dirToken3, { recursive: true })
    await fss.writeFile(fileToken, JSON.stringify(jwtObj));
    const data = await fss.readFile(fileToken, "utf-8");
    const jwtObj = JSON.parse(data).token;
    console.log("jwtObj", jwtObj);
  } catch (e) {
    console.error(e)
  }
}

createToken3();

// test 4 - 이렇게 쓰지 않음
// let token4;
// const dirToken4 = path.join(__dirname, 'sample4', 'files', 'token');
// const fileToken4 = path.join(dirToken4, 'jwt4.json');
// fs.mkdir(dirToken4, {recursive: true}, () => {
//   fs.writeFile(fileToken4, JSON.stringify(jwtObj), () => {
//     token4 = fs.readFileSync(fileToken4, 'utf-8');
//     _token4 = JSON.parse(token4).token;
//     console.log(`_token4: ${_token4}`);
//   })
// })
