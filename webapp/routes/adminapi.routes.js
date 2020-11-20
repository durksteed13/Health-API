module.exports = app => {
    const adminapis = require("../controllers/adminapi.controller.js");
  
    // Create new API
    app.post("/adminapi", adminapis.create);

    // Get all APIs
    app.get("/adminapi", adminapis.findAll);

    // Delete all Api and it's parameters
    app.delete("/adminapi/:apiname", adminapis.deleteEverything);
  };