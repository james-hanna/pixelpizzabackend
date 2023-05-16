/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "john",
          email: "john@example.com",
          password: "password",
          admin: false,
        },
        {
          username: "candy",
          email: "candy@example.com",
          password: "password",
          admin: false,
        },
        {
          username: "sandy",
          email: "sandy@example.com",
          password: "password",
          admin: false,
        },
      ]);
    });
};
