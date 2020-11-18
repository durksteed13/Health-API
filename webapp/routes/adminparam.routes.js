module.exports = app => {
    const adminparam = require("../controllers/adminparam.controller.js");

    // create new apiparam
    app.post("/adminparam", adminparam.create);

    // get all api params
    app.get("/adminparam", adminparam.findAll);

    // get specific api parameters
    app.get("/adminparam/:apiname", adminparam.findSome);

    // delete parameter
    app.delete("/adminparam/:apiname", adminparam.delete);
};