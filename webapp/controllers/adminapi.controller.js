const adminAPI = require("../models/adminapi.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an API
  const adminapi = new adminAPI({
    name: req.body.name,
    url: req.body.url,
  });

  adminAPI.create(adminapi, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the api."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  adminAPI.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving API."
      });
    else res.send(data);
  });
};

// Delete Api and all it's parameters
exports.deleteEverything = (req, res) => {
  adminAPI.removeAll(req.params.apiname, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing api and its parameters."
      });
    else res.send({ message: `All api and its parameters were deleted successfully!` });
  });
}