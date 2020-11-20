const User = require("../models/user.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  });

  // Save Customer in the database
  User.create(user, (err, data) => {
    // if (err)
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while creating the Customer."
    //   });
    // else 
    res.send(data);
  });
};

// Retrieve a User to attempt logging in
exports.find = (req, res) => {
	User.find(req.body.username, req.body.password, (err, data) => {
    // if (err)
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while logging in."
    //   });
    // else 
    res.send(data);
  });
};

// Get List of API names
exports.listAPI = (req, res) => {
  User.listAPI((err, data) => {
    res.send(data);
  });
};

// Get Params for given API
exports.listParam = (req, res) => {
  User.listParam(req.body.api, (err, data) => {
    res.send(data);
  });
};

// Get URL for API call for given API and Param
exports.getAPILink = (req, res) => {
  User.getAPILink(req.param('apiName'), req.param('paramName'), (err, data) => {
    res.send(data);
  });
};

// Save API Search for given user
exports.saveSearch = (req, res) => {
  User.saveSearch(req.body.userID, req.body.apiName, req.body.paramName, (err, data) => {
    res.send(data);
  });
};

// Get API searches for given user
exports.getSearches = (req, res) => {
  User.getSearches(req.body.userID, (err, data) => {
    res.send(data);
  });
};