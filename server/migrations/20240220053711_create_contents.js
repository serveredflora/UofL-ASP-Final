/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contents", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("type").notNullable();
    table.string("languages").notNullable();
    table.string("image_path").notNullable();
    table.text("description").notNullable();

    // Content type specific meta-data
    table.float("price").defaultTo(null);
    table.string("app_platforms").defaultTo(null);
    table.string("app_pricing_model").defaultTo(null);
    table.string("article_publisher_type").defaultTo(null);
    table.integer("article_reading_time").defaultTo(null);
    table.string("event_formats").defaultTo(null);
    table.string("event_type").defaultTo(null);
    table.string("event_start_date").defaultTo(null);
    table.string("event_end_date").defaultTo(null);
    table.string("event_duration").defaultTo(null);
    table.integer("event_participant_limit").defaultTo(null);
    table.string("video_platforms").defaultTo(null);
    table.string("video_types").defaultTo(null);

    table.boolean("approved").notNullable().defaultTo(false);
    table.integer("user_id").unsigned().notNullable();
    table.integer("checked_by").unsigned();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("checked_by").references("users.id").onDelete("SET NULL");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contents");
};
