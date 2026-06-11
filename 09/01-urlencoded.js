const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/posts', (req, res) => {
  console.log('req.body: ', req.body);
  console.log('author: ', req.body.author);
  res.send({success: true, msg: "success", data: req.body})
});

app.use(express.json());
app.listen(port, () => {
  console.log(`${port} server running...`);
});