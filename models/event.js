var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    nome: String,
    desc: String,
    localizacao: String,
    n_bilhetes_restantes: Number,
    preco: Number
   // poster:string
    //mudar poster para inserir um png

});

module.exports = mongoose.model('Event', EventSchema);