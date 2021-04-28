var mongoose = require("mongoose");
var Event = require("../models/event");

var eventController = {};

// vai buscar todas os events
eventController.showAll = function () {
  return Event.find();
};

// vai buscar event por id
eventController.show = function (id) {
  return Event.findOne({ _id: id });
};

// cria event
eventController.create = function (req, res) {
  var event;
  console.log(req.body);
  event = new Event(req.body);
  
  event.save((err, doc) => {
    if (err) {
      console.log(err);
      res.render('error', { message: err });
    } else {
      res.redirect("/events/show/" + doc._id);
    }
  });
};

// mostra 1 event para edicao
eventController.formEdit = function (req, res) {
  Event.findOne({ _id: req.params.id }).exec((err, dbevent) => {
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
  Event.findByIdAndUpdate(req.body._id, req.body, (err, editedevent) => {
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
  return Event.deleteOne({ _id: id });
};

module.exports = eventController;
