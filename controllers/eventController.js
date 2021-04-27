var mongoose = require("mongoose");
var event = require("../models/event");

var eventController = {};

// vai buscar todas os events
eventController.showAll = function () {
  return event.find();
};

// vai buscar event por id
eventController.show = function (id) {
  return event.findOne({ _id: id });
};

// cria event
eventController.create = function (req, res) {
  var event;
  /*  //if email exists
    if(req.body.email){
        let email = req.body.email;
        event = event.findOne({email: email});
    }

    if(event){
        res.locals.message = "Email já se encontra registado, efetue login ou utilize um email diferente.";
        res.render('error');
    } */

  event = new event(req.body);
  event.save((err, doc) => {
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
      res.redirect("/events/show/" + doc._id);
    }
  });
};

// mostra 1 event para edicao
eventController.formEdit = function (req, res) {
  event.findOne({ _id: req.params.id }).exec((err, dbevent) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("events/eventEditDetails", { event: dbevent });
    }
  });
};

// edita 1 event como resposta a um post de um form editar
eventController.edit = function (req, res) {
  event.findByIdAndUpdate(req.body._id, req.body, (err, editedevent) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/events/show/" + req.body._id);
    }
  });
};

// apaga uma conta por id
eventController.delete = function (id) {
  return event.deleteOne({ _id: id });
};

module.exports = eventController;
