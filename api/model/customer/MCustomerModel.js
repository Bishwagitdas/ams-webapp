const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MCustomerSchema = new Schema({
    username: { type: String, required: true, minlength: 4 },
    number: { type: String, required: true, minlength: 8 },
    customerID: { type: String, required: true, unique: true },
});

const MCustomerModel = model ('Customer', MCustomerSchema);

module.exports = MCustomerModel