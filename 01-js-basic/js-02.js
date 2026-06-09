// array

let arr = [5, 23, "hello", true, "world", -9];

// 1. for or while - console
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
console.log("---- 1. for or while - console----");
let count = 0;
while(arr.length > count) {
  console.log(arr[count]);
  count++;
} 
console.log("---- 2. foreach - console----");
// 2. foreach - console
arr.forEach(element => {
  console.log(element);
});
console.log("--------");
arr.forEach(e => console.log(e));
console.log("----3. filter arr 에서 string만 출력----");

// 3. filter arr 에서 string만 출력
arr.forEach((e) => {
  if(typeof e === "string") {
    console.log(e);
  }
})

arr.filter((e) => {
  const chk = typeof e === 'string';
  if (chk)console.log(e);
})

console.log("----4. filter arr 에서 number 합계 출력----");
let sum = 0;
let arrNum = [];

arr.forEach((e) => {
  if(typeof e === "number") {
    arrNum.push(e);
  }
});

console.log(arrNum.reduce((acc, cur) => acc + cur, 0));

let arrNum2 = arr.filter((e) => { return typeof e === "number"});
console.log(arrNum2.reduce((acc, cur) => acc + cur, 0));


