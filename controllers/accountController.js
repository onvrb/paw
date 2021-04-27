var mongoose = require("mongoose");
var Account = require("../models/account");

var accountController = {};

// vai buscar todas as accounts
accountController.showAll = function () {
  return Account.find();
};

// vai buscar account por id
accountController.show = function (id) {
  return Account.findOne({ _id: id });
};

// cria account
accountController.create = function (req, res) {
  var account;
  /*  //if email exists
    if(req.body.email){
        let email = req.body.email;
        account = Account.findOne({email: email});
    }

    if(account){
        res.locals.message = "Email já se encontra registado, efetue login ou utilize um email diferente.";
        res.render('error');
    } */

  account = new Account(req.body);
  account.save((err) => {
    if (err) {
      console.log("Erro a gravar");
      res.locals.message = "Email já se encontra registado, efetue login ou utilize um email diferente.";
      res.render('error');
    } else {
      res.redirect("/accounts");
    }
  });
};

// mostra 1 account para edicao
accountController.formEdit = function (req, res) {
  Account.findOne({ _id: req.params.id }).exec((err, dbaccount) => {
    if (err) {
      console.log("Erro a ler");
      res.redirect("/error");
    } else {
      res.render("accounts/accountEditDetails", { account: dbaccount });
    }
  });
};

// edita 1 account como resposta a um post de um form editar
accountController.edit = function (req, res) {
  Account.findByIdAndUpdate(req.body._id, req.body, (err, editedAccount) => {
    if (err) {
      console.log("Erro a gravar");
      res.redirect("/error");
    } else {
      res.redirect("/accounts/show/" + req.body._id);
    }
  });
};

// apaga uma conta por id
accountController.delete = function (id) {
  return Account.deleteOne({ _id: id });
};

module.exports = accountController;
