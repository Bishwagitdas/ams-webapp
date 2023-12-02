const mongoose = require('mongoose');
const {Schema, model} = mongoose;

    // email validatoin left
const UserSchema = new Schema({
    email: {type: String, required: true, min: 8},
    username: {type: String, required: true, min: 4},
    password: {type: String, required: true, min: 4},
    designation: {type: String, required: true}
});

const UserModel = model('User', UserSchema);    // the model is named 'User', and it will interact with a MongoDB collection called 'users'

module.exports = UserModel;