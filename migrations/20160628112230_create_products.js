
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(table) {
    table.increments();
    table.string('name')
    table.string('offer_listing_id')
    table.integer('price')
    table.string('seller')
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('products')
};
