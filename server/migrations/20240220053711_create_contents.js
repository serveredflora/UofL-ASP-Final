/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('contents', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('type').notNullable();
    table.string('language').notNullable();
    table.string('image_path').notNullable();
    table.text('description').notNullable();
    table.boolean('approved').notNullable().defaultTo(false); 
    table.integer('user_id').unsigned().notNullable();
    table.integer('checked_by').unsigned(); 
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.foreign('checked_by').references('users.id').onDelete('SET NULL'); 
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contents');
};
