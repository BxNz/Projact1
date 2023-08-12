const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

router.get("/users", (req, res) => {
  const user = db.query("Select * FROM user", (err, result) => {
    res.send(result);
  });
});

router.get("/user", (req, res, next) => {
  try {
    const authorizationHearder = req.headers.authorization;
    const token = authorizationHearder.split(' ')[1];
    console.log(token)
    const verifyToken = jwt.verify(token, 'bdhjbfsfsdfbdklfudfjnud');
    
    const sql = 'SELECT id, name, age, Email, address, contact FROM user WHERE id =?';
    const params = [verifyToken.id]
    db.query(sql, params, (err, result)=> {
        if(err) next(err);
        res.send(result);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/user", (req, res) => {
  const { username, password, age } = req.body;

  const sql = "insert into user(username, password, age) values(?,?,?)";
  const param = [username, password, age];

  const user = db.query(sql, param, (err, result) => {
    if (err) throw err;
    res.send("Insert success");
  });
});

router.put("/user", (req, res) => {
  const { username, password, age, id } = req.body;

  const sql = "Update user set username = ?, password = ?, age=? where id = ?";
  const param = [username, password, age, id];
  const user = db.query(sql, param, (err, result) => {
    if (err) throw err;
    res.send("Update success");
  });
});

router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = "Delete from user where id = ?";
  const param = [id];
  const user = db.query(sql, param, (err, result) => {
    if (err) throw err;
    res.send("Delete success");
  });
});
module.exports = router;
