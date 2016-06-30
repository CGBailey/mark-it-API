var express = require('express');
var router = express.Router();
var parser = require('xml2json');
var request = require('request');
var amazon = require('amazon-product-api');

var client = amazon.createClient({
  awsId:process.env.AWSACCESSKEYID ,
  awsSecret:process.env.AWSSECRETKEY,
  awsTag:process.env.AWSTAG
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

router.get('/test', function(req, res, next) {
  console.log(process.env.AWSTAG);

});
module.exports = router;
