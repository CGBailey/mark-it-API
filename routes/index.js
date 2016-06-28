var express = require('express');
var router = express.Router();
var parser = require('xml2json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
