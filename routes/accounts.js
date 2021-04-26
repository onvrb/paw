var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accountController');

router.get('/', accountController.showAll );
router.get('/show/:id', accountController.show );
router.get('/create', accountController.formCreate);
router.post('/create', accountController.create);
router.get('/edit/:id', accountController.formEdit);
router.post('/edit/:id', accountController.edit);
router.get('/delete/:id', accountController.delete );

module.exports = router;