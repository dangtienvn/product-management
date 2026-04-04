const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const database = require("./config/database");

// Route 
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

database.connect();

mongoose.connect( process.env.MONGO_URL);

const app = express();
const port = process.env.PORT || 3000;

// parse urlencoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// method-override (only required if you use `_method` to simulate PUT/PATCH/DELETE)
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const systemConfig = require("./config/system");

// Set up view engine
app.set("views", "./views");
app.set("view engine", "pug");

// Global variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(express.static("public"));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});