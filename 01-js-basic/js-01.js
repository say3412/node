// hello world - console
console.log("hello world");

let date = new Date();
const day = date.getDay();
console.log(day);
// 0 ~ 6  sun - sat
let daystr = "";
switch(day) {
  case 0:
    daystr = 'Sun';
    break;
  case 1: 
    daystr = 'Mon';
    break;
  case 2: 
    daystr = 'Tues';
    break;
  case 3: 
    daystr = 'Wed';
    break;
  case 4: 
    daystr = 'Thurs';
    break;
  case 5: 
    daystr = 'Fri';
    break;
  case 6: 
    daystr = 'Sat';
    break;
}
console.log(daystr);

//  
