const express = require("express");
const router = express.Router();
const sqlConnection = require("./sqlConnection");

//lấy toàn bộ thông tin user
router.get("/", (req, res) => {
  let sql = "select * from user";
  sqlConnection(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//check user
router.get("/get/:email", (req, res) => {
  let sql = "select * from user where Email=?";
  sqlConnection(sql, [req.params.email], (err, results) => {
    if (err) {
      res.send(false);
    } else {
      if (results.length == 0) {
        res.send(false);
      } else {
        res.send(results);
      }
    }
  });
});

router.post("/", (req, res) => {
  const postinfo = {
    idUser: req.body.UserId,
    Name: req.body.UserName,
    Email: req.body.UserEmail,
    Image: req.body.UserImage,
    Coin: 0
  };

  let sql = "insert into user set ?";
  sqlConnection(sql, [postinfo], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      res.send("success");
    }
  });
});

module.exports = router;