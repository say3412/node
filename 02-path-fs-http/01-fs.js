// file system

const { error } = require("console");
const fs = require("fs");
// fs.writeFileSync("test.txt", "Hello World");

// // 1. test2.txt 파일을 만들고, "안녕하세요, 남부여성발전센터 입니다."
// fs.writeFileSync("test2.txt", "안녕하세요, 남부여성발전센터 입니다.");

// // 2. 비동기 파일쓰기 테스트 (파일명, 내용, callback 함수)
// fs.writeFile("async-test.txt", "Hello World", (err) => {
//   if (err) {
//     console.log("error", err);
//     return
//   }
//   console.log("비동기 파일 쓰기 완료");
// });

// console.log("비동기 파일쓰기 완료 됐을지도 아닐지도..."); 

// // 3. async-test2.txt 파일 만들고, '안녕하세요, 남부여성 발전 센터 입니다.' fs.writeFile 메소드로 파일쓰기 연습
// fs.writeFile("async-test2.txt", "안녕하세요, 남부여성 발전 센터 입니다.", (err) => {
//   if(err) {
//     console.log("error", err);
//     return;
//   }
// });

// const data = fs.readFileSync("test2.txt", "utf-8");
// console.log(data);

// const datatest = fs.readFileSync("test.txt", "utf-8");
// console.log(datatest);

// const dataAsync = fs.readFileSync("async-test.txt", "utf-8");
// console.log(dataAsync);

// const dataAsync2 = fs.readFileSync("async-test2.txt", "utf-8");
// console.log(dataAsync2);

const objData = {
  name: "김철수",
  age: 25,
  grage: "A"
}

// // fs.writeFileSync("obj-test.json", JSON.stringify(objData));
// const dataObj = fs.readFileSync("obj-test.json", "utf-8");
// console.log(dataObj);
// console.log(typeof dataObj);
// const jsonObj = JSON.parse(dataObj);
// console.log(jsonObj);
// console.log(typeof jsonObj);
// console.log(jsonObj.name);

let personInfo = {
  name: "Hong",
  age: 25,
  address: "Seoul Guemcheon",
  hobby: ["뜨게질", "독서", "커피내리기"]
}

// 1. personInfo 객체를 JSON string 포맷으로 personInfo.json 저장
// fs.writeFileSync("personInfo.json", JSON.stringify(personInfo));

// 2. personInfo.json  파일에서 내용을 읽고 personInfo2 객체에 저장
let personInfo1;
try {
  personInfo1 = fs.readFileSync("personInfo.json", "utf-8");
} catch (e) {
  personInfo1 = "{}";
}

const personInfo2 = JSON.parse(personInfo1);

// 3. personInfo2 의 name, age, address, hobby를 콘솔에 출력
console.log(personInfo2.name, personInfo2.age, personInfo2.address, personInfo2.hobby);