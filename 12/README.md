## 1. 프로젝트 생성
nest new shop --skip-git

cd shop

## 2. 모듈 생성
nest g resource categories --no-spec
nest g resource products --no-spec
nest g resource users --no-spec

## 3. 패키지 설치
npm i class-validator class-transformer dotenv
npm i @prisma/client@6
npm i -D prisma@6
npm i @nestjs/swagger

## prisma generate
npx prisma init

psql -U postgres postgres (psql -U 사용자명 데이터베이스명)
CREATE DATABASE ushop;
GRANT ALL PRIVILEGES ON DATABASE ushop TO postgres;
\c ushop (ushop 데이터베이스로 이동(connect), psql 내부 명령어이며 SQL 문법은 아님)
GRANT ALL ON SCHEMA public TO postgres;

## 터미널 bash
npx prisma migrate dev --name init // 실제 table 생성
npx prisma generate // api 생성


## Prisma service
nest g module prisma
nest g service prisma --no-spec




# Auth
## 1. 관련 패지키 설치
npm i @nestjs/jwt@11 @nestjs/passport@11 passport@0.7 passport-jwt@4 bcrypt@6
npm i -D @types/passport-jwt@4 @types/bcrypt@6

## 2. .env JWT 시크릿 추가
JWT_SECREAT="dev-secret-change-me"

## 3. 관련 모듈 생성
nest g module auth
nest g service auth --no-spec
nest g controller auth --no-spec
nest g guard auth/guards/jwt-auth --no-spec

## 4. schema 수정
npx prisma format
npx prisma migrate dev --name add_auth
npx prisma generate

## 5. UserService
5.1 createUser, findByEmail 
5.2 export UserService @ UserModule

## 6. Auth 모듈
mkdir auth/dto
login.dto.ts
register.dto.ts

src/auth/constants.ts

auth.module.ts 에서 import
imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '14d' },
    }),
  ],

auth.service.ts


## order 모듈 추가
nest g resource order --no-spec
nest g resource carts --no-spec

##


