const router =require("express").Router();
// const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const connection = require('../connection');

router.get('/getUsers', (req, res) => {
  connection.query('SELECT * FROM userTable', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({message: "Failed to fetch all users"});
    }

    res.status(200).json({send: "ok", data: results});
  });
});

// router.get("/getUsers",async(req,res)=>{
//     try {
//         const user = await User.find({});
//         res.send({send:"ok",data:user});
//         //res.status(200).json(user);
//     } catch (error) {
//        res.status(404).json({message:"Failed to fetch all users"}); 
//     }
// })

router.get('/getSingleUser/:id', (req, res) => {
  const userID = req.params.id;

  connection.query('SELECT * FROM userTable WHERE id = ?', [userID], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(404).json({message: "User fetch failed"});
    }
    if (results.length === 0){
      return res.status(404).json({message: "User not found"});
    }

    res.status(200).json(results[0]);
  });
});
// router.get('/getSingleUser/:id',async(req,res)=>{
//     try {
//         const singleUser = await User.findById(req.params.id);
//         res.status(200).json(singleUser);
//     } catch (error) {
//        res.status(404).json({message:"User fetch Failed"}); 
//     }
// })

router.post('/remove', (req, res) => {
  const { userid } = req.body;

  connection.query('SELECT * FROM userTable WHERE id = ?', [userid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // If the user exists, proceed with the DELETE operation
    connection.query('DELETE FROM userTable WHERE id = ?', [userid], (deleteError, deleteResults) => {
      if (deleteError) {
        console.error(deleteError);
        return res.status(500).json({ message: "Delete Failed" });
      }
  
      res.status(200).json({ status: "Ok", data: "Deleted" });
      console.log(deleteResults);
    });
  });
});

// router.post("/remove",async(req,res)=>{
//     const { userid } = req.body;
//   try {
//     User.deleteOne({ _id: userid }, function (err, res) {
//       console.log(err);
//     });
//     res.send({ status: "Ok", data: "Deleted" });}
//      catch (error) {
//         res.status(404).json({message:"Delete Failed"});
//     }
// })

router.put('/updateUser/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, designation } = req.body;

  try {
    

    connection.query(
      'UPDATE userTable SET username = ?, email = ?, designation = ? WHERE id = ?',
      [username, email,  designation, userId],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(404).json({ message: "Update Failed" });
        }

        res.status(200).json({ username, email, designation });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put('/updateUserPass/:id', async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;

  try {
    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    connection.query(
      'UPDATE userTable SET password = ?  WHERE id = ?',
      [hashedPass, userId],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(404).json({ message: "Update Failed" });
        }

        res.status(200).json({ message:"User Pass Updated Successfully!" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// router.put("/updateUser/:id",async(req,res)=>{
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password,salt);
//     const updateUser = ({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPass,
//       designation:req.body.designation
//     });
//     //save Topic and response
//     try {
//     await User.updateOne({_id:req.params.id},updateUser);
//      res.status(200).json(updateUser);
//     } catch (err) {
//      console.log(err)
//     }
//  })
module.exports = router;