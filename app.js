const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "express_db",
});

// mysqlからデータを持ってくる
app.get("/", (req, res) => {
  const sql = "select * from users";
  // 参考例
  const num = 10000;
  // 基礎課題
  // ==========ここから変数宣言、従来通りJavaScriptno要領で書いてください。==========
  // 基礎課題01:文字列を画面に出力しましょう。
  const text = "実務課題";

  // 基礎課題02:リストを画面表示
  const array = ["コメント1", "コメント2", "コメント3"];

  // app.jsのここで配列を用意し、viewsフォルダのindex.ejsのscriptタグ内で画面に出力出来るように機能を作成して下さい。

  // 基礎課題03:マップを画面表示

  let member = [
    { id: 2, name: "s.chiba", email: "s.chiba@gmail.com" },
    { id: 13, name: "t.kosuge", email: "t.kosuge@gmail.com" },
    { id: 15, name: "m.chiba", email: "m.chiba@gmail.com" },
    { id: 17, name: "t.suzuki", email: "t.suzuki@gmail.com" },
    { id: 18, name: "t.hasegawa", email: "t.hasegawa@gmail.com" },
  ];

  // マップというのは配列の中にオブジェクトを設定するものになります。
  // オブジェクトを以下のように設定
  // name: s.chiba, email: s.chiba@gmail.com
  // name: t.kosuge, email: t.kosuge@gmail.com
  // name: m.chiba, email: m.chiba@gmail.com
  // name: t.suzuki, email: t.suzuki@gmail.com
  // name: t.hasegawa, email: t.hasegawa@gmail.com
  // ==========ここまでの範囲で書くようにしましょう。==========
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", {
      users: result,
      // 変数の宣言は以下の例の通りにしてみて下さい。
      // オブジェクトの考え方と同じで、プロパティ名: 値の形になります。値の部分は変数名を入れるようにして下さい。
      //例） numbar: num,
      number: num,
      container: text,
      comment: array,
      user: member,
    });
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO users SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/html/form.html"));
});

app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render("edit", { user: result });
  });
});

app.post("/update/:id", (req, res) => {
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
