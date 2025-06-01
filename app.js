const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const indexRouter = require("./routes/index");
const categoriesRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");

const app = express();

// add error handler later
// setting up ejs and ejs express layouts
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set("layout", "layout");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// rutas
app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} and url: http://localhost:${PORT}`
  );
});
