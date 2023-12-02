const router = require('express').Router();
const connection = require('../../connection');

router.post("/updateDaily", async (req, res) => {
 try{
    const {
        CustomerID,
        DiffRateID,
        Date,
        MonthName,
        AWB,
        WGT,
        Item,
        FRCost_US,
        FRCost_BDT,
        Location,
        Loc_Cost,
        Custom,
        TotalAmount,
        CustomerName
      } = req.body;

      const query = `
      INSERT INTO PrepaidOrder (CustomerID, DiffRateID, Date, MonthName, AWB, WGT, Item, FRCost_US, FRCost_BDT, Location, Loc_Cost, Custom, TotalAmount, CustomerName)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [CustomerID, DiffRateID, Date, MonthName, AWB, WGT, Item, FRCost_US, FRCost_BDT, Location, Loc_Cost, Custom, TotalAmount, CustomerName];
    connection.query(query, values);

    res.status(201).json({message: 'Data inserted successfully'});
 } catch (err){
    console.error('Error:', err);
    // Send an error response
    res.status(500).json({ message: 'Failed to insert data' });
 }
});

module.exports = router;