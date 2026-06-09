const users = [
  { id: 1, name: "Hong", age: 25, score: 85 },
  { id: 2, name: "Kim", age: 30, score: 92 },
  { id: 3, name: "Lee", age: 22, score: 78 },
  { id: 4, name: "Park", age: 19, score: 88 },
  { id: 5, name: "Choi", age: 35, score: 95 },
];

// 1. filter user의 나이가 30세 미만 사람들의 출력
let userUnder30 = users.filter((e) => { return e.age < 30 });
console.log(userUnder30);

// 2. users name only
console.log('---2. users name only---');
const userNames = users.map((e) => { 
  return e.name });
console.log(userNames);

const userN = users.map((e) => e.name);
console.log(userN);

// 3. age under 25
console.log('---3. age under 25---');
const userNames25 = users.filter((e) => e.age < 25).map((e) => e.name);
console.log(userNames25);

const userN25 = users.filter((e) => e.age < 25).map((e) => e.name);
console.log(userN25);

console.log('---00. score upper 90---');
const userS90 = users.filter((e) => e.score > 90).map((e) => e.name);
console.log(userS90);

console.log('---00. score upper 90---');