const winston = require("winston");

// 로거 만들기
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(), // 간단한 텍스트 형식
  transports: [ // 로거에 대한 출력 방향 설정
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "app.log"
    })
  ]
});

console.log("logging start");

logger.error("error ocured! - most import log");
logger.warn("warn - warning log");
logger.info("info  - info log");
logger.debug("debug - debug log");

console.log("logging end");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), // 여기서 설정을 해야만 아래에서 사용가능
    winston.format.printf(({timestamp, level, message}) => {
      return `${timestamp} [${level}]: ${message}`
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'temp/simple.log'})
  ]
});

simpleLogger.info("타임 스탬프가 포함된 로거");
