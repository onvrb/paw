var mongoose = require('mongoose');
var Account = require('../models/account');

var accountController = {};

// mostra todos accounts 
accountController.showAll = function(req, res){
    Account.find({}).exec((err, dbaccounts)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            console.log(dbaccounts);
            res.render('accounts/accountList', {accounts: dbaccounts});
        }
    })
}

// mostra 1 account por id
accountController.show = function(req, res){
    Account.findOne({_id:req.params.id}).exec((err, dbaccount)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('accounts/accountViewDetails', {account: dbaccount});
        }
    })
}

// form para criar 1 account
accountController.formCreate = function(req,res){
    res.render('accounts/createForm');
}

// cria 1 account como resposta a um post de um form
accountController.create = function(req,res){
    var account = new Account(req.body);
    account.save((err)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/accounts');
        }
    })
}

// mostra 1 account para edicao
accountController.formEdit = function(req, res){
    Account.findOne({_id:req.params.id}).exec((err, dbaccount)=>{
        if (err){
            console.log('Erro a ler');
            res.redirect('/error')
        } else {
            res.render('accounts/accountEditDetails', {account: dbaccount});
        }
    })
}

// edita 1 account como resposta a um post de um form editar
accountController.edit = function(req,res){
    Account.findByIdAndUpdate(req.body._id, req.body, (err, editedAccount)=>{
        if (err){
            console.log('Erro a gravar');
            res.redirect('/error')
        } else {
            res.redirect('/accounts/show/'+req.body._id);
        }
    } )
}

// elimina 1 account
accountController.delete = function(req, res){
    Account.remove({_id:req.params.id}).exec((err)=>{
        if (err){
            console.log('Erro a ler');
            
        } else {
            res.redirect('/accounts')
        }
    })
}

module.exports = accountController;