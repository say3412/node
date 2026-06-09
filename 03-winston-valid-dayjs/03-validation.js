// npm install validator uuid
const validator = require('validator');
const { v4: uuidv4 } = require("uuid"); // uuid 모듈 안에 v4객체를 uuidv4 이름으로 여기서 사용할 수 있게 함

const emailStr = "test@example.com";
console.log("이메일 검증", validator.isEmail(emailStr));

const urlStr = "http://www.naver.com";
console.log("url 검증: ", validator.isURL(urlStr));

const ipStr = "127.0.0.1";
console.log("ip 검증: ", validator.isIP(ipStr));

const phonStr = "010-0123-1234";
console.log("전화번호 검증: ", validator.isMobilePhone(phonStr));

const passwStr = "123qweQQQ!";
console.log("암호 검증: ", validator.isStrongPassword(passwStr));

// 비밀번호 강도 검증
console.log(
  "비밀번호 강도:",
  validator.isStrongPassword("111qqqQQQ!", {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
);

console.log("문자열 길이 검증: ", validator.isLength('hello world', {min:4, max:20}));


let i = 0;
while(i < 10) {
  const uuid = uuidv4();
  console.log("UUID v4", uuid);
  i++;
}

const user = {
  id: uuidv4(),
  name: "홍길동",
  email: "hong@email.com"
}

console.log(user);

const uuidv1 = require("uuid").v1;
const timeBasedUUid = uuidv1();
console.log("시간 기반 uuid: ", timeBasedUUid);

let j = 0;
while(j < 10) {
  const uuid = uuidv1();
  console.log("UUID v4", uuid);
  j++;
}