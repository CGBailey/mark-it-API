
exports.up = function(knex, Promise) {
  return knex.schema.createTable('swipes', function(table) {
    table.increments();
    table.integer('product_id').notNullable().references('id').inTable('products');
    table.boolean('right').defaultTo(false);
    table.boolean('left').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.dropTable('products')
};
