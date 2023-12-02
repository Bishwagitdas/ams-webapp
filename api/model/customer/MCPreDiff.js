const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MCPreDiffSchema = new Schema({
    username: { type: String, required: true, minlength: 4 },
    number: { type: String, required: true, minlength: 8 },
    customerID: { type: String, required: true, unique: true },
    //fixedRate: {type: Number ,required: true },

});

const MCPreDiffModel = model ('MCPreDiff', MCPreDiffSchema);

module.exports = MCPreDiffModel