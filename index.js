const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const database = require("./config/database");

const route = require("./routes/client/index.route");

database.connect();

mongoose.connect( process.env.MONGO_URL);

const app = express();
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});