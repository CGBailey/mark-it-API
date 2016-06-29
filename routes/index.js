var express = require('express');
var router = express.Router();
var parser = require('xml2json');
var request = require('request');
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId: ,
  awsSecret:,
  awsTag:
});
/* GET home page. */
router.get('/', function(req, res, next) {
  client.itemSearch({
    searchIndex: 'Books',
    keywords: 'rpg games',
    responseGroup: 'ItemAttributes,Offers,Images,Large'
  }).then(function(results){
    console.log(results);
    res.send(results)
  }).catch(function(err){
    console.log(err);
  });
});
module.exports = router;
