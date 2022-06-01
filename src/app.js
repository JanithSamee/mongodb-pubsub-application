const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db/mongoose");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
