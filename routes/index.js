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
  }).then(function(){
  knex('products').where({name: req.body.product_name})
})
  .then(function(product){
    knex('swipes').insert({product_id: product[0].id, right: true})
  }).then(function(){
    res.send({status: '200', message: "Sucess"})
  }).catch(function(err){
    console.log(err);
    res.send(err)
  });
});

router.post('/left', function(req, res, next) {
  knex('products').where({name: req.body.product_name})
    .then(function(there) {
      if(!there[0]) {
        knex('products').insert({name: req.body.product_name})
      }
  }).then(function(){
  knex('products').where({name: req.body.product_name})
})
  .then(function(){
    knex('swipes').insert({product_id: product[0].id, left: true})
  }).then(function(){
    res.send({status: '200', message: "Sucess"})
  }).catch(function(err){
    console.log(err);
    res.send(err)
  });
});

router.get('/right', function(req, res, next) {
  knex('products').where({name: req.body.product_name})
  .then(function(product) {
    knex('swipes').where({product_id: product_id, right: true})
  }).then(function(swipes) {
    res.send(swipes.length)
  }).catch(function(err){
    console.log(err);
    res.send(err)
  });
})


router.get('/left', function(req, res, next) {
  knex('products').where({name: req.body.product_name}).
  then(function(product) {
    knex('swipes').Where({product_id: product_id, left: true})
  }).then(function(swipes) {
    res.send(swipes.length)
  }).catch(function(err){
    console.log(err);
    res.send(err)
  });
})

router.get('/swipes', function(req, res, next) {
  knex('products').then(function(results) {
    res.send(results)
  }).catch(function(err){
    console.log(err);
    res.send(err)
  });
})

module.exports = router;
