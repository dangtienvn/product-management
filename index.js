const express = require('express');
const route = require("./routes/client/index.route");
const app = express();
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

route(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});