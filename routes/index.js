var express = require('express');
var router = express.Router();

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

/* GET home page. */
router.get('/', ensureLoggedIn(),  function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
