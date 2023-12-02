const crypto = require('crypto');

const router =require("express").Router();
const mCustomer = require("../../../model/customer/MCPreFR");

router.post('/mCustomerReg', async (req, res) => {
    const { username, number, fixedRate } = req.body;
    const customerID = crypto
        .createHash('sha256')
        .update(number) // Hash the number
        .digest('hex') // Get the hexadecimal representation
        .slice(0, 10);
        console.log(username,number,fixedRate,customerID);
        console.log('fetch came till here');
    try {
        const mCustomerName = await mCustomer.create({
            username,
            number,
            customerID,
            fixedRate
        });
        res.status(201).json({ message: 'Customer created successfully', customer: mCustomerName });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;