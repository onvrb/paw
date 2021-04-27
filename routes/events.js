var express = require("express");
var router = express.Router();
var eventController = require("../controllers/eventController");

// mostra todos events
router.get("/", (req, res) => {
  //ShowAll
  eventController
    .showAll()
    .then((data) => {
      res.render("events/eventList", { events: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

// mostra 1 event por id
router.get("/show/:id", (req, res) => {
  //Show
  let id = req.params.id;
  eventController
    .show(id)
    .then((data) => {
      res.render("events/eventViewDetails", { event: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

// form para criar 1 event
router.get("/create", (req, res) => {
  res.render("events/createForm");
});

router.post("/create", eventController.create); //create
router.get("/edit/:id", eventController.formEdit); //formEdit
router.post("/edit/:id", eventController.edit); //edit

// elimina 1 event
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  eventController
    .delete(id)
    .then((data) => {
      res.redirect("/events");
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

module.exports = router;
