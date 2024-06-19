const express = require("express");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const indexRouter = require("./src/routes/index.route.js");
require("dotenv").config();

const supabaseClient = require("./src/model/supabase.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(indexRouter);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
