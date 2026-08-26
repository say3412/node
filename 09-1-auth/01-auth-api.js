// npm i express dotenv jsonwebtoken bcryptjs multer nodemon
const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const secret = process.env.JWT_SECRET;
const saltRount = Number(process.env.SALT_ROUND);

const port = 3001;
let userId = 1;
let postId = 1;
let lv = 1;
const users = [];
const posts = [];

// 파일 저장소 만들기
try {
  fs.readdirSync("upload");
} catch (e) {
  console.log("creating upload directory....");
  fs.mkdirSync("upload");
}

// multer 객체 만들기
const upload = multer({
  storage: multer.diskStorage({
    destination(req, res, done) {
      done(null, "upload/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const newName = baseName + Date.now() + ext;
      done(null, newName);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 10 },
})

// 회원가입
app.post("/register", upload.single("image"), async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, msg: "name, email and password are required." });
  }

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ success: false, msg: "email is already registered." });
  }

  // 비밀번호 hash
  const hash = await bcrypt.hash(password, saltRount);
  // 이미지
  const image = req.file;
  const user = { id: userId++, name, email, password: hash, lv: lv++, image: image.filename };
  users.push(user);
  res.status(201).json({ id: user.id, name: user.name, email: user.email, image: user.image });
});

// 로그인
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, msg: "email and password are required." });

  const user = users.find((user) => user.email === email);
  if (!user || (!await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ success: false, msg: "잘 못 입력하셨습니다." });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, lv: user.lv }, secret, { expiresIn: "1h" }
  );

  //res.status(200).json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  res.status(200).json({ success: true, token: token });
});

app.listen(port, () => {
  console.log("running at 3001..");
});