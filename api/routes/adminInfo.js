const router = require("express").Router();
//const Admin = require("../model/AdminModel");
const pool = require("../connection");
const jwt = require("jsonwebtoken");
const util = require('util');  // Import the util module

// Convert the query method to a Promise
const query = util.promisify(pool.query).bind(pool);
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
  router.post("/adminData", async (req, res) => {
    const { token } = req.body;
    try {
      const admin = jwt.verify(token, JWT_SECRET,(err, res) =>{
        if(err) {
          return "token expired"
        }
        return res;
      });
      console.log(admin);
      // if (!admin.email) {
      //   return res.send({ status: "error", data: "Invalid token" });
      // }

      if (admin == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const adminemail = admin.email;
      // console.log(adminemail);
      const [rows] = await query('SELECT * FROM adminTable WHERE email = ?', [adminemail]);
      // console.log(rows);
      if (rows) {
        res.send({ status: "ok", data: rows });
      } else {
        res.send({ status: "error", data: "Admin not found" });
      }
  
    } catch (error) {
      console.error(error);
  
      if (error.name === 'TokenExpiredError') {
        res.send({ status: "error", data: "Token expired" });
      } else {
        res.send({ status: "error", data: "Internal server error" });
      }
    }
  });

module.exports = router;