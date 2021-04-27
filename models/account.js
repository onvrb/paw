var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    email:{ type:String,
    unique:true,},
    name: String,
    password: String
});

module.exports = mongoose.model('Account', AccountSchema);