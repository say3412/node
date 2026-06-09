let personInfo = {
  name: "Hong",
  age: 25,
  address: "Seoul Guemcheon",
  hobby: ["뜨게질", "독서", "커피내리기"]
}


// 1. 아래의 정보를 출력해보세요.
console.log(personInfo.name);
console.log(personInfo['name']);

// 2. 객체에 나이를 1씩 추가할 수 있는 addAge()를 추가
personInfo.addAge = function() {
  this.age += 1;
  console.log(this.age);
}
console.log(personInfo);
// 3. addAge 호출해서 나이가 1씩 증가하는지 확인
personInfo.addAge();
personInfo.addAge();
personInfo.addAge();
personInfo.addAge();