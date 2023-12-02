const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Admin = require("../model/AdminModel");
const connection = require('../connection');
router.post("/login", async (req, res) => {
    try {
        const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
  const { email, password } = req.body;

  const sql = 'SELECT * FROM adminTable WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
          res.status(401).json({ message: 'Invalid username or password' });
      } else {
          const admin = results[0];

          bcrypt.compare(password, admin.password, (err, match) => {
              if (err) throw err;

              if (match) {
                  const expired = 24*60*60;
                  const token = jwt.sign({ email: admin.email }, JWT_SECRET, {
                      expiresIn: expired,
                  });

                  res.json({status:"ok" ,token });
              } else {
                  res.status(401).json({ message: 'Invalid username or password' });
              }
          });
      }
  });
    } catch (error) {
        console.log({message:"An error occured"});
    }
  

});
  module.exports = router;