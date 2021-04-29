const { NotExtended } = require("http-errors");
var mongoose = require("mongoose");
var Location = require("../models/location");

var locationController = {};

// vai buscar todas as locations
locationController.showAll = function () {
  return Location.find();
};

// vai buscar location por id
locationController.show = function (id) {
  return Location.findOne({ _id: id });
};

// cria location
locationController.create = function (req, res) {
  var location;
  /*  //if email exists
    if(req.body.email){
        let email = req.body.email;
        location = Location.findOne({email: email});
    }

    if(location){
        res.locals.message = "Email já se encontra registado, efetue login ou utilize um email diferente.";
        res.render('error');
    } */

  location = new Location(req.body);
  location.save((err, doc) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) { // duplicate key error collection
        res.render('error', { message: "Email já se encontra registado, efetue login ou utilize um email diferente." });
      } 
      else { 
        res.render('error', { message: err }); 
      }
    } 
    else {
      res.redirect("/locations/show/" + doc._id);
    }
  });
};

// mostra 1 location para edicao
locationController.formEdit = function (req, res) {
  Location.findOne({ _id: req.params.id }).exec((err, dblocation) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("locations/locationEditDetails", { location: dblocation });
    }
  });
};

// edita 1 location como resposta a um post de um form editar
locationController.edit = function (req, res) {
  Location.findByIdAndUpdate(req.body._id, req.body, (err, editedLocation) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/locations/show/" + req.body._id);
    }
  });
};

// apaga uma conta por id
locationController.delete = function (id) {
  return Location.deleteOne({ _id: id });
};


// mostra todos os items
locationController.showAllRest = function(req, res){
  Location.find({}).exec((err,dblocations)=>{
    if (err){
      console.log('Erro ao ler');
      res.redirect('/error');
    } else {
      console.log(dblocations);
      res.render('locations/locationList', {locations: dblocations});
    }
  })
}

// mostra todos os items em modo rest
locationController.showAllRest = function(req, res, next){
  Location.find({}).exec((err,dblocations)=>{
    if (err){
      console.log('Erro ao ler');
      next(err);
      // res.redirect('/error');
    } else {
      res.json(dblocations);
      // console.log(dblocations);
      // res.render('locations/locationList', {locations: dblocations});
    }
  })
}



module.exports = locationController;
