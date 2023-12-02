const router =require("express").Router();
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
// const User = require("../model/UserModel");

const connection = require('../connection');

router.post('/register', async(req, res) => {
  const {email, password, username, designation} = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    const sql = 'INSERT INTO userTable (email, password, username, designation) VALUES (?, ?, ?, ?)';
    connection.query(sql, [email, hash, username, designation], (err) => {
      if (err) throw err;

      res.send('User registered successfully');
    });
  });
});

module.exports = router;

// router.post('/register', async (req, res) => {
//   const {email, password, username, designation} = req.body;  // data being retrieved from AdminReg -> username, password
//   try{      
//     const userDoc = await User.create({
//         email, 
//         password: await bcrypt.hash(password,salt),   // updating a salted & hashed password
//         username,
//         designation});
//     res.json(userDoc);  // getting the requested data (Check payload: status 200)
//   } catch(e){
//     res.status(400).json(e.message);
//   }
// })
//   module.exports = router;