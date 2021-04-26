var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('Account', AccountSchema);