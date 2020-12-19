const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(express.static(__dirname));
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response){
    response.sendFile('index.html', { root: __dirname });
});

app.get('/index', function(request, response){
    response.redirect('/');
});

app.get('/about', function(request, response){
    response.sendFile('about.html', { root: __dirname });
});

app.get('/documentation', function(request, response){
    response.sendFile('documentation.html', { root: __dirname });
});

app.get('/admin', function(request, response){
    response.sendFile('admin.html', { root: __dirname });
});

require("./routes/users.routes.js")(app);
require("./routes/adminapi.routes.js")(app);
require("./routes/adminparam.routes.js")(app);

// set port, listen for requests
app.listen(3000, '0.0.0.0', () => {
  console.log("Server is running on port 3000.");
});