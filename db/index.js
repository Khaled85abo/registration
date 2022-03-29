const db = require("./db");

async function authenticate() {
  try {
    db.authenticate();
    console.log("Success Authentication");
  } catch (error) {
    console.log("error when creating database : " + error);
  }
}

authenticate();

module.exports = authenticate;
