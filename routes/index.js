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
var queries = [{search: 'Books', keywords: 'rpg game'}, {search: 'Toys', keywords: 'board game'}, {search: 'Toys', keywords: 'card game'}, {search: 'Books', keywords: "tabletop game"}]
/* GET home page. */
router.get('/', function(req, res, next) {

  client.itemSearch({
    searchIndex: 'Books',
    keywords: 'rpg games',
    responseGroup: 'Large'
  }).then(function(results){
    res.send(results)
  }).catch(function(err){
    console.log(err);
    res.send(err)
  });
});

router.get('/more', function(req, res, next) {
  function query() {
    var popped = queries.pop();
    queries.unshift(popped)
    console.log(queries[0].search);
  }
query()
  client.itemSearch({
    searchIndex: queries[0].search,
    keywords: queries[0].keywords,
    responseGroup: 'Large'
  }).then(function(results){
    res.send(results)
  }).catch(function(err){
    console.log(err);
    res.send(err)
  });
});

router.post('/right', function(req, res, next) {
  knex('products').where({name: req.body.product_name})
    .then(function(there) {
      if(!there[0]) {
        knex('products').insert({name: req.body.product_name})
      }
  })
  .then(function(){
    knex('swipes').insert({right: req.body.swipe})
  })
});

router.post('/left', function(req, res, next) {
  knex('products').where({name: req.body.product_name})
    .then(function(there) {
      if(!there[0]) {
        knex('products').insert({name: req.body.product_name})
      }
  })
  .then(function(){
    knex('swipes').insert({left: req.body.swipe})
  })
});


module.exports = router;
