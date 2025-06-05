const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
require("dotenv").config();

const indexRouter = require("./routes/index");
const categoriesRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");
const adminRouter = require("./routes/admin");

const app = express();

// add error handler later
// setting up ejs and ejs express layouts
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set("layout", "layout");

// express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.COOKIE_SECURE === "true" }, // true for https, set to false for localhost
  })
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// rutas
app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} and url: http://localhost:${PORT}`
  );
});
