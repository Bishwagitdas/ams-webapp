const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MCPreFRSchema = new Schema({
    username: { type: String, required: true, minlength: 4 },
    number: { type: String, required: true, minlength: 8 },
    customerID: { type: String, required: true, unique: true },
    fixedRate: {type: Number ,required: true }
});

const MCPreFRModel = model ('MCPreFR', MCPreFRSchema);

module.exports = MCPreFRModel