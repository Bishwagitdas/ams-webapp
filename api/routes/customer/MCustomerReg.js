const crypto = require('crypto');

const router =require("express").Router();
// const mCustomer = require("../../model/customer/MCustomerModel");

const connection = require('../../connection');

router.post('/mCustomerReg', (req, res) => {
    const {COMPANY, EncryptedID, TypeOfPayment,DeliveryItem} = req.body;
    let paymentMethod = "";
    const sqlCheck = 'SELECT * FROM Customer WHERE Name = ?';
    const checkVal = [COMPANY];

    connection.query(sqlCheck, checkVal, (err, results) => {
        if (err){
            console.error('Error querying MySQL: ' + err.message);
            res.status(400).json({ error: err.message });
        } else {
            if (results.length > 0) {
                res.status(200).json({message: 'Customer exists'});
            }
            else {     
                if(TypeOfPayment==="PP" ||TypeOfPayment==="pp" ){
                    paymentMethod="Pre-paid";
                 }           
                const sql = 'INSERT INTO Customer (Name, EncryptedID, PurchaseMethod) VALUES (?, ?, ?)';
                const values = [COMPANY, EncryptedID, paymentMethod];
                console.log(values);
                connection.query(sql, values, (err, result) => {
                    if (err){
                        console.error('Error inserting data into MySQL: ' + err.message);
                        res.status(400).json({ error: err.message });
                    } else {
                        console.log('Inserted into MySQL with ID: ' + result.insertId);
                        res.status(201).json({ message: 'Customer created successfully' });
                    }
                });
            }
        }
    })

    // const customerID = crypto.randomBytes(10).toString('hex');

})

// router.post('/mCustomerReg', async (req, res) => {
//     const { username, number } = req.body;
//     const customerID = crypto
//         .createHash('sha256')
//         .update(number) // Hash the number
//         .digest('hex') // Get the hexadecimal representation
//         .slice(0, 10);
//     try {
//         const mCustomerName = await mCustomer.create({
//             username,
//             number,
//             customerID,
//         });
//         res.status(201).json({ message: 'Customer created successfully', customer: mCustomerName });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });
module.exports = router;