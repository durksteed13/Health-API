const adminAPIparam = require("../models/adminparam.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create new api param
    const adminapiparam = new adminAPIparam({
      api_used: req.body.api_used,
      param: req.body.param,
      name: req.body.name
    });
  
    adminAPIparam.create(adminapiparam, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the api parameter."
        });
      else res.send(data);
    });
  }

// get all api parameters
exports.findAll = (req, res) => {
    adminAPIparam.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving API."
        });
      else res.send(data);
    });
  };

// get specific api parameters
exports.findSome = (req, res) => {
    adminAPIparam.getSome(req.params.apiname, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving API."
        });
      else res.send(data);
    });
  };

// delete parameter
exports.delete = (req, res) => {
    adminAPIparam.deleteparam(req.params.apiname, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing api and its parameters."
        });
      else res.send({ message: `Parameter was deleted successfully!` });
    });
  }