const sql = require("./db.js");

// Admin API and parameters
const adminAPI = function (adminapi) {
    this.name = adminapi.name;
    this.url = adminapi.url;
}

// add new api
adminAPI.create = (newAPI, result) => {
    sql.query("INSERT INTO api SET ?", newAPI, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("inserted new api ")
        result(null, res);
    })
}

// get all api
adminAPI.getAll = result => {
    sql.query("SELECT * FROM api", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("all apis: ", res);
        result(null, res);
    })
};

// delete api and all it's parameters
adminAPI.removeAll = (id, result) => {
    sql.query("DELETE FROM api WHERE name = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("deleted api with name: ", id);
        result(null, res);
    });

    sql.query("DELETE FROM params WHERE api_used = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("deleted all api parameters with api_used: ", id);
    });
}

module.exports = adminAPI;