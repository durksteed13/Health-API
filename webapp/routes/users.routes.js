module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/users", users.create);

  // Retrieve a single user with username to attempt logging in
  app.post("/users/:username", users.find);

  // // Update a Customer with customerId
  // app.put("/customers/:customerId", customers.update);

  // // Delete a Customer with customerId
  // app.delete("/customers/:customerId", customers.delete);

  // // Create a new Customer
  // app.delete("/customers", customers.deleteAll);
};