var express = require("express");
var router = express.Router();
var locationController = require("../controllers/locationController");

// mostra todos locations
router.get("/", (req, res) => {
  //ShowAll
  locationController
    .showAll()
    .then((data) => {
      res.render("locations/locationList", { locations: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

// mostra 1 location por id
router.get("/show/:id", (req, res) => {
  //Show
  let id = req.params.id;
  locationController
    .show(id)
    .then((data) => {
      res.render("locations/locationViewDetails", { location: data });
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

// form para criar 1 location
router.get("/create", (req, res) => {
  res.render("locations/createForm");
});

router.post("/create", locationController.create); //create
router.get("/edit/:id", locationController.formEdit); //formEdit
router.post("/edit/:id", locationController.edit); //edit

// elimina 1 location
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  locationController
    .delete(id)
    .then((data) => {
      res.redirect("/locations");
    })
    .catch((error) => {
      res.redirect("/error");
    });
});

module.exports = router;
