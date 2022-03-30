const db = require("./db");
const User = require("./models/User");

async function authenticate() {
  try {
    db.authenticate();
    User.sync();
    console.log("Success Authentication");
  } catch (error) {
    console.log("error when creating database : " + error);
  }
}

module.exports = { authenticate };
