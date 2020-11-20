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
      result(null, {"success" : success, email: res.insertEmail, ...newUser   });
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
      console.log(res);
      result(null, {"success" : success, "result" : res  });
      return;
    }

    // not user with the username
    result({ kind: "not_found" }, null);
  });
};

User.listAPI = result => {
  sql.query("SELECT name FROM api", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("api names: ", res);
    result(null, res);
  });
};

User.listParam = (api, result) => {
  sql.query("SELECT name FROM params WHERE api_used = ?", api, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("params: ", res);
    result(null, res);
  });
};

User.getAPILink = (apiName, paramName, result) => {
  sql.query("SELECT url FROM api WHERE name = ? UNION SELECT param FROM params WHERE name = ?", [apiName, paramName], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var link = res[0]['url']+res[1]['url'];
    console.log("link: ", link);
    result(null, link);
  });
};

User.saveSearch = (userID, apiName, paramName, result) => {
  sql.query("INSERT INTO searches (user_id, api, param) VALUES (?, ?, ?)", [userID, apiName, paramName], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created new search: ", {user: userID});
    result(null, res);
  });
};

User.getSearches = (userID, result) => {
  sql.query("SELECT * from searches WHERE user_id = ?", userID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = User;