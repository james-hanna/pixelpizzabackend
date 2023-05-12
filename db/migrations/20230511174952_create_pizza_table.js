/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pizza", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("price").notNullable();
    table.text("description");
    table.text("ingredients");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pizza");
};
