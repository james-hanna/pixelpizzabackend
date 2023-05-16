/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cart", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("product_id").unsigned().notNullable();
    table
      .foreign("product_id")
      .references("id")
      .inTable("pizza")
      .onDelete("CASCADE");
    table.integer("quantity").unsigned().notNullable().defaultTo(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart");
};
