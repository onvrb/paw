var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    email:{ type:String, unique:true,},
    name: String,
    password: String,
    type: String,
    covid_result: Boolean,
    banned: Boolean
});

module.exports = mongoose.model('Account', AccountSchema);