const express = require("express");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

const handleRegister = (req, res, next) => {
  // Handle register user

  next();
};

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", handleRegister, (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.listen(PORT, () => console.log("running on port" + PORT));
