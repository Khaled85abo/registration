const express = require("express");
const session = require("express-session");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const { authenticate } = require("./db");
const User = require("./db/models/User");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

const handleRegister = async (req, res, next) => {
  // Handle register user
  console.log(req.body);

  const hash = bcrypt.hashSync(req.body.password, salt);
  console.log(hash);
  try {
    await User.create({ email: req.body.email, password: hash });
  } catch (error) {
    console.log(error);
  }
  next();
};

const validate = async (req, res, next) => {
  let user = null;
  console.log(req.body);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    user = await User.findOne({ where: { email: req.body.email } });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
  if (user && user.password === hash) {
    req.body.status = "success";
  } else {
    req.body.status = "error";
  }

  next();
};

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", handleRegister, (req, res) => {
  res.redirect("/");
});
app.get("/login", (reg, res) => {
  res.render("login");
});
app.post("/login", validate, (req, res) => {
  if (req.body.status == "success") {
    res.redirect("/welcome");
  } else {
    res.redirect("/");
  }
});
app.get("/welcome", (req, res) => {
  res.render("welcome");
});
authenticate();
app.listen(PORT, () => console.log("running on port" + PORT));
