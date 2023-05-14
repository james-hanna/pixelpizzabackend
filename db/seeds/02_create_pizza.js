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
        {
          name: "Example_Pizza2",
          price: 8.99,
          description: "Example Description2",
          ingredients: "Dough, Sauce, Cheese",
          imgUrl: "https://i.imgur.com/286sM4Q.png",
        },
        {
          name: "Example_Pizza3",
          price: 10.99,
          description: "Example Description3",
          ingredients: "Dough, Sauce, Cheese, Pinapple, Ham",
          imgUrl: "https://i.imgur.com/286sM4Q.png",
        },
        {
          name: "Example_Pizza4",
          price: 10.99,
          description: "Example Description4",
          ingredients: "Dough, Sauce, Cheese, Bacon, Pinapple",
          imgUrl: "https://i.imgur.com/286sM4Q.png",
        },
        {
          name: "Example_Pizza5",
          price: 10.99,
          description: "Example Description5",
          ingredients: "Dough, Sauce, Cheese, Ham, Bacon, Pepperoni, Sausage",
          imgUrl: "https://i.imgur.com/286sM4Q.png",
        },
        {
          name: "Example_Pizza6",
          price: 11.99,
          description: "Example Description6",
          ingredients: "Dough",
          imgUrl: "https://i.imgur.com/286sM4Q.png",
        },
      ]);
    });
};
