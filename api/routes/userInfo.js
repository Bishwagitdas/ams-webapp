const router = require("express").Router();
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const util = require('util');  // Import the util module
const pool = require("../connection");
// Convert the query method to a Promise
const query = util.promisify(pool.query).bind(pool);
const JWT_SECRET =
"hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
router.post("/userData",async(req,res)=>{
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    if (!user.email) {
      return res.send({ status: "error", data: "Invalid token" });
    }

    const useremail = user.email;
    console.log(useremail);
    const [rows] = await query('SELECT * FROM userTable WHERE email = ?', [useremail]);
    console.log(rows);
    if (rows) {
      res.send({ status: "ok", data: rows });
    } else {
      res.send({ status: "error", data: "User not found" });
    }

  } catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      res.send({ status: "error", data: "Token expired" });
    } else {
      res.send({ status: "error", data: "Internal server error" });
    }
  }
})


module.exports = router;