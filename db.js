const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const connectDB = async () => {
  return sqlite.open({
    filename: "./urls.db",
    driver: sqlite3.Database,
  });
};

module.exports = connectDB;
