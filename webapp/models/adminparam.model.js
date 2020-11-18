const sql = require("./db.js");

// add new api parameters

const adminAPIparam = function (apiparam) {
    this.api_used = apiparam.api_used;
    this.param = apiparam.param;
    this.name = apiparam.name;
}

adminAPIparam.create = (newAPI, result) => {
    sql.query("INSERT INTO params SET ?", newAPI, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("inserted new api parameter")
    })
}

// get list of API parameters
adminAPIparam.getAll = result => {
    sql.query("SELECT * FROM params", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("all parameters: ", res);
        result(null, res);
    })
}

// get specific api parameters
adminAPIparam.getSome = (id, result) => {
    sql.query("SELECT * FROM params WHERE api_used = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("all specific parameters: ", res);
        result(null, res);
    })
}

// delete parameter
adminAPIparam.deleteparam = (id, result) => {
    sql.query("DELETE FROM params WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("all specific parameters: ", res);
        result(null, res);
    })
}

module.exports = adminAPIparam;