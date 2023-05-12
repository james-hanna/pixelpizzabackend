/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pizza")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pizza").insert([
        {
          name: "Example_Pizza",
          price: 9.99,
          description: "Example Description",
          ingredients: "Dough, Sauce, Cheese, Pepperoni",
          imgUrl: "https://i.imgur.com/286sM4Q.png",
        },
      ]);
    });
};
