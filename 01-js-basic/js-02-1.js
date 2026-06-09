let arr = [5, 23, "hello", true, "world", -9];

console.log("---- 1. for or while - console----");
for(let i=0; i<arr.length; i++) {
  console.log(arr[i]);
}

let j = 0;
while(j < arr.length) {
  console.log(arr[j]);
  j++;
}

console.log("---- 2. foreach - console----");
arr.forEach((e) => console.log(e));

console.log("----3. filter arr 에서 string만 출력----");
let filterd = arr.filter((f) => (typeof f === 'string'));
console.log(filterd);

console.log("----4. filter arr 에서 number 합계 출력----");
let filterdN = arr.filter((f) => (typeof f === 'number'));
console.log(filterdN);

let filterdS = filterdN.reduce((acc, cur) => (acc + cur), 0);
console.log(filterdS);

console.log(
  arr.filter((f) => (typeof f === 'number'))
  .reduce((acc, cur) => (acc + cur), 0)
);