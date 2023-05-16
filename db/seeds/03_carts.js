/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes all existing entries
  return knex("cart")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cart").insert([
        { user_id: 1, product_id: 1, quantity: 2 },
        { user_id: 1, product_id: 2, quantity: 1 },
        { user_id: 2, product_id: 3, quantity: 3 },
      ]);
    });
};
