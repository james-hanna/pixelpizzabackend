/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("pizza", function (table) {
    table.string("imgUrl");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("pizza", function (table) {
    table.dropColumn("imgUrl");
  });
};
