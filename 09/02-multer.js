// npm i multer morgan nodemon

const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const port = 3001;

try {
  // fs.mkdirSync("upload");
  fs.readdirSync("upload");
} catch (e) {
  console.log("creating upload dir..");
  fs.mkdirSync("upload");
}

// multer 객체를 이렇게 만든다!
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) { // done callback 함수
      done(null, "upload/"); // error, path
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자명만 빼서 준다.
      const baseName = path.basename(file.originalname, ext); // 오리널네임에서 확장자만 빼준다.
      const newName = baseName + Date.now() + ext;
      done(null, newName);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 10 } // 10mb
});

// single file
// upload.single("image"): 미들웨어
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send({ success: true, image: req.file.filename });
});

// multi files
// upload.array("images"): 미들웨어
app.post("/uploads", upload.array("images"), (req, res) => {
  req.files.map((f) => {
    console.log(f);
  });
  // console.log(req.files);
  console.log(req.body);
  res.send({ success: true, image: req.files });
});

// 여러파일을 각각의 키로 전송
app.post("/uploadfiles", upload.fields([{ name: "image" }, { name: "pdf" }]), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  // res.send({ succuess: true, image: req.files});
  res.send({ succuess: true, image: req.files.image, pdf: req.files.pdf });
});

app.get("/image", (req, res) => {
  const filename = req.query.filename;
  console.log(filename);
  return res.sendFile(process.cwd() + '/upload/' + filename);
});

app.listen(port, () => {
  console.log(`${port}... running`);
});
