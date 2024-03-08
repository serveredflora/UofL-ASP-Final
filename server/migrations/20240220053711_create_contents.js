/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('content', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('type').notNullable();
    table.string('language').notNullable();
    table.string('image_path').notNullable();
    table.text('description').notNullable(); 
    table.timestamps(true, true);
  });
};


exports.down = function(knex) {
  return knex.schema.dropTable('uscontenters');
};
