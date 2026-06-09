const dayjs = require("dayjs");

require("dayjs/locale/ko");
const utc = require("dayjs/plugin/utc");
const relativeTimePlugin = require("dayjs/plugin/relativeTime");

// dayjs는 핵심만 가볍게 유지하고, 부기능은 가볍게 플러그인으로 켠다.
dayjs.extend(utc);
dayjs.extend(relativeTimePlugin); // relativeTime 플러그인을 켜야 .fromNow()가 동작
dayjs.locale("ko");

const pastTime = dayjs().subtract(3, "hour"); // 3시간 전
const futureTime = dayjs().add(5, "day"); // 5일 후

console.log(pastTime.format("YYYY-MM-DD HH:mm:ss"));
console.log(futureTime.format("YYYY-MM-DD HH:mm:ss"));

console.log("3시간 전", pastTime.fromNow());
console.log("5일 후", futureTime.fromNow());

const nowDayjs = dayjs();
console.log(nowDayjs.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDayjs.format("YYYY년 MM월 DD일 - HH시 mm분 ss초"));
console.log(nowDayjs.format("YYYY년 M월 D일 HH시 mm분 ss초"));

const dateDayjs = dayjs("2026-08-07");
console.log(dateDayjs.format("YYYY-MM-DD HH:mm:ss"));

// 시간 더하기 빼기
const nextDaysDayjs = dayjs().add(2, "day");
console.log("2일 후", nextDaysDayjs.format("YYYY-MM-DD HH:mm:ss"));

const nextWeekDayjs = dayjs().add(1, "week");
console.log("1주 후", nextWeekDayjs.format("YYYY-MM-DD HH:mm:ss"));

const nextMothDayjs = dayjs().add(5, "month");
console.log("5개월 후", nextMothDayjs.format("YYYY-MM-DD HH:mm:ss"));

// 특정 날짜까지 남은 일 수 계산
const startDt = dayjs("2026-04-01");
const endDt = dayjs("2026-10-23");
const diffDt = endDt.diff(startDt, "day");
const diffDtW = endDt.diff(startDt, "week");
const diffDtM = endDt.diff(startDt, "month");

console.log(`날짜 차이: ${startDt.format("YYYY년 MM월 DD일")} 에서  ${endDt.format("YYYY년 MM월 DD일")} 까지는 ${diffDt}일 차이 입니다.`);
console.log(`날짜 차이: ${startDt.format("YYYY년 MM월 DD일")} 에서  ${endDt.format("YYYY년 MM월 DD일")} 까지는 ${diffDtW}주 차이 입니다.`);
console.log(`날짜 차이: ${startDt.format("YYYY년 MM월 DD일")} 에서  ${endDt.format("YYYY년 MM월 DD일")} 까지는 ${diffDtM}개월 차이 입니다.`);

console.log(`요일 차이: ${dayjs().format("d")}요일 입니다.`);
console.log(`요일 차이: ${dayjs().format("dd")}요일 입니다.`);
console.log(`요일 차이: ${dayjs().format("ddd")}요일 입니다.`);
console.log(`요일 차이: ${dayjs().format("dddd")}요일 입니다.`);

// 날짜 유효성 검사
console.log("날짜 유효성 검사: ", dayjs("2026-13-45").isValid()); // 자바스크립트는 13월이나 45일 같은 허용 범위를 넘어서는 숫자가 들어오면, 에러를 내지 않고 다음 달이나 다음 해로 넘겨서 정상적인 날짜로 자동 변환

const start = dayjs("2026-01-01");
const end = dayjs("2026-12-31");

const range = [];
for (
  let date = start;
  date.isBefore(end) || date.isSame(end, "day");
  date = date.add(1, "day")
) {
  range.push(date.format("YYYY년 MM월 DD일"))
}
console.log(range.length);