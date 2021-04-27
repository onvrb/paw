var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    name: String,
    address: String,
    capacity: Number
});

module.exports = mongoose.model('Location', LocationSchema);