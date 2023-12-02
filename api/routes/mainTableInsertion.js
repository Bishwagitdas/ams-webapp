const router = require("express").Router();
const connection = require("../connection");

router.post('/tableinsertion', (req, res) => {
    const {
      CustomerID,
      DiffRateID,
      NO,
      MONTH,
      DATE,
      FLIGHT,
      MAWB,
      AWB,
      SHIPPER,
      COMPANY,
      PERSON,
      NUMBER,
      AREA,
      NOP,
      WGT,
      SPXTYPE,
      PAYMENTMETH,
      DELIVERYITEM,
      VOLUMEWEIGHT,
      TIME,
      RECEIVING,
      REMARKS,
      ROUNDWGT,
      FrCost$,
      FrCostBDT,
      CUSTOM,
      TOTAL,
      PAIDDATE,
      ACTUALPAID,
    } = req.body;
  
    const sql = `INSERT INTO MainTable (CustomerID, DiffRateID, NO, DATE, MONTH, FLIGHT, MAWB, AWB, SHIPPER, COMPANY, 
        \`CONTACT PERSON\`, \`CONTACT NUMBER\`, AREA, NOP, WGT, \`SPX TYPE\`, \`TYPE OF PAYMENT\`, 
        \`DELIVERY ITEM\`, \`VOLUME WEIGHT\`, TIME, \`RECEIVING PERSON\`, REMARKS, \`ROUND WEIGHT\`, FRCOST$, 
        FRCOSTBDT, CUSTOM, TOTAL, \`PAID DATE\`, \`ACTUAL DATE\`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
    const values = [
      CustomerID,
      DiffRateID,
      NO,
      DATE,
      MONTH,
      FLIGHT,
      MAWB,
      AWB,
      SHIPPER,
      COMPANY,
      PERSON,
      NUMBER,
      AREA,
      NOP,
      WGT,
      SPXTYPE,
      PAYMENTMETH,
      DELIVERYITEM,
      VOLUMEWEIGHT,
      TIME,
      RECEIVING,
      REMARKS,
      ROUNDWGT,
      FrCost$,
      FrCostBDT,
      CUSTOM,
      TOTAL,
      PAIDDATE,
      ACTUALPAID,
    ];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
      } else {
        res.status(200).json({ success: 'Data inserted successfully' });
      }
    });
  });

  module.exports = router;