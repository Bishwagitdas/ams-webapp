const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require("../model/UserModel");

const connection = require('../connection');

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(email,password);
    const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

    connection.query('SELECT * FROM userTable WHERE email = ?', [email], async(error, results) => {
        if (error){
            console.error(error);
            return res.status(500).json({error: "Internal server error"});
        }

        if (results.length === 0){
            return res.status(404).json("User not found");
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch){
            const token = jwt.sign({email: user.email}, JWT_SECRET, {
                expiresIn: "30s",
            });
            if (res.status(201)){
                return res.json({status: "ok", access_token: token});
            } else {
                return res.json({error: "error"});
            }
        }
    });

    // try {
    //     const userDoc = await User.findOne({email});
    //     if (!userDoc){
    //         alert('User not found')
    //         return res.status(404).json("Email not found");
    //     }
    //     const isMatch = await bcrypt.compare(password, userDoc.password);
    //     if (isMatch){
    //         const token = jwt.sign({email: userDoc.email}, JWT_SECRET, {
    //             expiresIn: "24hrs",
    //         });
    //         if (res.status(201)){
    //             return res.json({status: "ok", access_token: token});
    //         } else {
    //             return res.json({error: "error"});
    //         }
    //     }
    //     if (password !== userDoc.password) {
    //         return res.status(404).json("Invalid Password");
    //     }
    // } catch (err) {
    //     res.status(500).json(err)
    //   }
   
  }) 
  module.exports = router;