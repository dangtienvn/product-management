/**
 * 1. LIBRARIES & ENVIRONMENT CONFIGURATION
 */
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
require("dotenv").config();

/**
 * 2. DATABASE & SYSTEM CONFIGURATION
 */
const database = require("./config/database");
const systemConfig = require("./config/system");

// Connect to Database via internal config
database.connect();

// Direct connection using MONGO_URL from .env
mongoose.connect(process.env.MONGO_URL);

const app = express();
const port = process.env.PORT || 3000;

/**
 * 3. VIEW ENGINE SETUP
 */
app.set("views", "./views");
app.set("view engine", "pug");

/**
 * 4. MIDDLEWARES
 */
// Parse incoming request bodies (URL-encoded)
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Support HTTP verbs such as PUT or DELETE where the client doesn't support it
app.use(methodOverride("_method"));

// Serve static files (CSS, JS, Images) from the 'public' directory
app.use(express.static("public"));

/**
 * 5. GLOBAL VARIABLES
 * These variables are accessible in all Pug template files
 */
app.locals.prefixAdmin = systemConfig.prefixAdmin;

/**
 * 6. ROUTES
 */
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

route(app);      // Client-side routes
routeAdmin(app); // Admin-side routes

/**
 * 7. SERVER INITIALIZATION
 */
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  console.log(`Access here: http://localhost:${port}`);
});