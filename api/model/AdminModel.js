const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const AdminSchema = new Schema({
    email: {type: String, required: true, min: 8, require: true},
    username: {type: String, required: true, min: 4},
    password: {type: String, required: true},
});

const AdminModel = model('Admin', AdminSchema);    // the model is named 'Admin', and it will interact with a MongoDB collection called 'adminss'

module.exports = AdminModel;