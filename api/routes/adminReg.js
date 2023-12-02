const router = require("express").Router();
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
// const Admin = require("../model/AdminModel")

const connection = require("../connection");

router.post("/adminReg", async (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    const sql =
      "INSERT INTO adminTable (username, email ,password) VALUES (?, ? ,?)";
    connection.query(sql, [username, email, hash], (err) => {
      if (err) throw err;

      res.send("Admin registered successfully");
    });
  });
});
module.exports = router;

// router.post("/adminReg",async(req,res)=>{

//   const salt = await bcrypt.genSalt(10);
//   const hashedPass = await bcrypt.hash(req.body.password,salt);
//   const newAdmin = new Admin({
//     email: req.body.email,
//     username: req.body.username,
//     password: hashedPass,
//   })
//     try {
//       const Admin = await newAdmin.save();
//       res.status(200).json(Admin);
//       return;
//     } catch (error) {
//         console.log(err)
//     }
// })
// module.exports = router;
