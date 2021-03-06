// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("ifeq", function (a, b, options) {
  if (a == b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "teamlx";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here

const passingUserInfo = require("./middleware/passingUserInfo");
app.use("/", passingUserInfo);

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);

const newsRoutes = require("./routes/news");
const isLoggedIn = require("./middleware/isLoggedIn");
app.use("/news", newsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
