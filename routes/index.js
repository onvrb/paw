var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rocano Events' });
});

module.exports = router;
