module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/users", users.create);

  // Retrieve a single user with username to attempt logging in
  app.post("/users/:username", users.find);

  // Get list of API names for first selection
  app.get("/api", users.listAPI);

  // Get list of Params for given API
  app.post("/api", users.listParam);

  // Get API Link for given API and Param
  app.get("/apilink", users.getAPILink);

  // Save Search for given User
  // app.post("/usersStore/:username", users.saveSearch);
};