var express = require("express");
var router = express.Router();
var accountController = require("../controllers/accountController");

// mostra todos accounts
router.get("/", (req, res) => {
  //ShowAll
  accountController
    .showAll()
    .then((data) => {
      res.render("accounts/accountList", { accounts: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

// mostra 1 account por id
router.get("/show/:id", (req, res) => {
  //Show
  let id = req.params.id;
  accountController
    .show(id)
    .then((data) => {
      res.render("accounts/accountViewDetails", { account: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

// form para criar 1 account
router.get("/create", (req, res) => {
  res.render("accounts/createForm");
});

// form para backoffice
router.get("/backoffice", (req, res) => {
  res.render("backoffice");
});

router.post("/create", accountController.create); //create
router.get("/edit/:id", accountController.formEdit); //formEdit
router.post("/edit/:id", accountController.edit); //edit

// elimina 1 account
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  accountController
    .delete(id)
    .then((data) => {
      res.redirect("/accounts");
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

module.exports = router;
