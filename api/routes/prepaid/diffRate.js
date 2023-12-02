const router = require('express').Router();
const connection = require('../../connection');
const util = require('util');
router.put("/diffRate/:id", async (req, res) => {
   const CustomerID = req.params.id;
   console.log(CustomerID);
   const {
      tillW1,
      val1,
      tillW2,
      val2,
      tillW3,
      val3,
      tillW4,
      val4,
      tillW5,
      val5,
    } = req.body;
 try{
   
      // const CustomerID = req.params.id;
      const sql = `
      UPDATE diffrate SET tillW1=?, val1=?, tillW2=?, val2=?, tillW3=?, val3=?, tillW4=?, val4=?, tillW5=?, val5=? WHERE CustomerID=?; 
    `;
   //  console.log(query);
    const values = [tillW1, val1, tillW2, val2, tillW3, val3, tillW4, val4, tillW5, val5,CustomerID];
    const result = connection.query(sql, values);
    //console.log(result);
   //  if(result.length>0){
   //    console.log("Diff Rate already added");
   //  }
   //   console.log(values);
    res.status(201).json({status:"ok",data:{tillW1,val1,tillW2,val2,tillW3,val3,tillW4,val4,tillW5,val5}});
 } catch (err){
   // console.error('Error:', util.inspect(err, { showHidden: false, depth: null }));
    // Send an error response
    res.status(500).json({ message: 'Failed to insert data' });
 }
});
router.post("/diffRate", async (req, res) => {
   try{
      const {
          tillW1,
          val1,
          tillW2,
          val2,
          tillW3,
          val3,
          tillW4,
          val4,
          tillW5,
          val5,
          customerID
        } = req.body;
  
        const query = `
        INSERT INTO DiffRate (tillW1, val1, tillW2, val2, tillW3, val3, tillW4, val4, tillW5, val5, customerID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [tillW1, val1, tillW2, val2, tillW3, val3, tillW4, val4, tillW5, val5, customerID];
      const result = connection.query(query, values);
     //  if(result.length>0){
     //    console.log("Diff Rate already added");
     //  }
     //   console.log(values);
      res.status(201).json({message: 'Data inserted successfully'});
   } catch (err){
      console.error('Error:', err);
      // Send an error response
      res.status(500).json({ message: 'Failed to insert data' });
   }
  });
router.post('/diffID',async(req,res)=>{
   try {
      const {customerID} = req.body;
      const sql = "INSERT INTO DIFFRATE (customerID) values(?)"
      const values =[customerID];
      const result = connection.query(sql,values);
      res.status(200).json({Message:"Data Inserted Successfully"});
   } catch (error) {
      res.status(500).json({message:"error occured"});
   }
})
router.get("/diffrates",async(req,res)=>{
   try {
      const sql = "SELECT * FROM diffrate"
      connection.query(sql,(err,result)=>{
          if(err){
            res.json({msg:"Failed to fetch"});
          }else{
            res.json({send: "ok", data: result});
          }
      })
   } catch (error) {
      console.log("An error Occured");
   }
})
router.get("/getSingleDiffRate/:id",async(req,res)=>{
   try {
      const CustomerID = req.params.id;
      connection.query("Select * from diffrate WHERE CustomerID=?",[CustomerID],(error,results)=>{
         if(error){
            console.log("An error occured");
            return res.status(404).json({message:"Failed to fetch Diffrate"});
         }
         if (results.length === 0){
            return res.status(404).json({message: "DiffRate not found"});
          }
      
          res.status(200).json(results[0]);
      })
   } catch (error) {
      
   }
})
module.exports = router;