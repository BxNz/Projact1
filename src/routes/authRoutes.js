const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");


//ເອເລີແລ້ວບໍ່ໃຫ້ໂປຣແກຣມຫຍຸດ
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Sever Error");
};

router.post("/Login", (req, res, next) => {
  try {

  const { name, password } = req.body;
  const sql = "SELECT id FROM user WHERE name = ? AND password = ?";
  const params = [name, password];
  db.query(sql, params, (err, result) => {
    if (err) next(err);
    if (result.length > 0) {
      const token = jwt.sign({ id: result[0].id}, 'bdhjbfsfsdfbdklfudfjnud');
      const data = {
        success: true,
        message:'Login success',
        data: {
          token
        }
      }
      res.send(data);
    } else {
      const data = {
        success: false,
        message:'Login fail',
        data: {}
      }
      res.send(data);
    }
  });
} catch (error) { next(err);
    
}
});
//ເພື່ອຜູ້ໃຊ້
router.post("/Register", (req, res, next) => {
  //ກວດວ່າມີຊື່ຜູ້ໃຊ້ບໍຖ້າມີບໍ່ໃຫ້ເພີ່ມ
  const { name, password, age } = req.body;
  const Checkusername = "SELECT id FROM user WHERE name=?";
  const CheckusernameParams = [name];
  db.query(Checkusername, CheckusernameParams, (err, result) => {
    if (err) next(err);
    if (result.length > 0) {
      res.send("Username is exist");
    } else {
      //ສ້າງໄວ້ເປັນຟັງສັນຂອງການເພີ່ມຂໍ້ມູນ
      const sql = "INSERT INTO user(name, password, age) values(?,?,?)";
      const params = [name, password, age];
      db.query(sql, params, (err, result) => {
        if (err) next(err);
        res.send("Register success");
      });
    }
  });
});
router.use(errorHandler);
module.exports = router;
