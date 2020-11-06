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