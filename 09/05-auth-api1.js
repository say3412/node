// npm i dotenv
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
dotenv.config(); // 옵션을 매개변수로 넣을 수도 있음

const app = express();
const port = 3008;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static("upload"));

const secret = process.env.JWT_SECRET;
const saltRount = Number(process.env.SALT_ROUND);
// console.log(secret);
// console.log(saltRount);

const users = [];
const posts = [];
let userId = 1;
let postId = 1;
let level = 1;


// 파일 저장소 만들기
try {
  fs.readdirSync("upload");
} catch (e) {
  console.log("creating upload directory....");
  fs.mkdir("upload");
}

// multer 객체 만들기
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "upload/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자명만
      const basename = path.basename(file.originalname, ext); // 확장자명만 빼주기
      const newName = basename + Date.now() + ext;
      done(null, newName);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 10 },
});

// 회원가입, 사진 미들웨어 업로드
app.post("/register", upload.single("image"), async (req, res) => {
  const image = req.file;
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    if (image) fs.unlinkSync(req.file.path);
    return res
      .status(400)
      .json({ success: false, msg: "name, email and password are needed." });
  }

  if (users.find((user) => user.email === email)) {
    if (image) fs.unlinkSync(req.file.path);
    return res
      .status(409)
      .json({ success: false, msg: "이미 가입된 이메일 입니다." });
  }

  // 저장
  const hash = await bcrypt.hash(password, saltRount);
  const user = {
    id: userId++,
    name,
    email,
    password: hash,
    lv: level++,
    image: image.filename,
  };
  users.push(user);

  res.status(201).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
});

// 로그인
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "email and password are needed." });
  }

  const user = users.find((user) => user.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(401)
      .json({
        success: false,
        msg: "이메일 또는 비밀번호가 잘 못 되었습니다.",
      });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, lv: user.lv },
    secret,
    { expiresIn: "1h" },
  );
  res.status(200).json({ success: true, token: token });
});

// 인증 미들웨어 - 원래 따로 파일 관리
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "유효인 토큰이 없습니다." });
  }

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ success: false, msg: "유효인 토큰이 없습니다." });
  }
}

// 전체 사용자 (관리자 기능)
app.get("/users", auth, (req, res) => {
  if (Number(req.user.lv) % 2 === 1) {
    // 0: 관리자, 1: 사용자
    return res.status(401).json({ success: false, msg: "권한이 없습니다." });
  }
  const filename = req.user.image;
  res
    .status(200)
    .json({
      success: true,
      users: users.map((user) => ({
        ...user,
        image: `http://localhost:${port}/upload/${user.image}`,
      })),
    });
});

// 전체 게시물 조회
app.get("/posts", auth, (req, res) => {
  res.status(200).json({ posts });
});

// 게시글 작성
app.post("/posts", auth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, msg: "title and content are needed." });
  }
  const post = { id: postId++, title, content, author: req.user.name };
  posts.push(post);

  res.status(201).json({ success: true, post: post });
});

app.listen(port, () => {
  console.log(`running ${port}`);
});
