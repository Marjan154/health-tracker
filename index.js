const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { db } = require("./models");
var cors = require("cors");

// middleware that should allow open access for requests to routes
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// middleware that should allow open access for requests to routes

app.use(express.static(path.join(__dirname, "frontend", "build")));

//Database stuff
app.use("/api", require("./api"));

//React app link
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database!:", err);
  });

const port = 5000;
app.listen(port, () => console.log(`app is listening on ${port}`));
