const sql = require("./db.js");
const encrypt = require("../credentials/encrypt.js");
const validate = require("../credentials/validate.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.username = user.username;
  var result = encrypt.encrypt(user.password);
  this.password = result['hash'];
  this.salt = result['salt'];
};

User.create = (newUser, result) => {
  sql.query("SELECT * FROM users WHERE username = ?", newUser.username, (err, res) => {
    if (res.length) {
      result(null, {"success" : false  });
    } else {
      sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var success = true;
      console.log("created user: ", { email: res.insertEmail, ...newUser });
      result(null, {"success" : success  });
    });
    }
  });
};

User.find = (username, password, result) => {
  sql.query("SELECT * FROM users WHERE username = ?", username, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("validating user: ", {username: res[0]['username'] });
      var success = validate.validate(password, res[0]['salt'], res[0]['password']);
      if(success) {
        console.log(res[0]['username'] + " logged in");
      }
      result(null, {"success" : success  });
      return;
    }

    // not user with the username
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;