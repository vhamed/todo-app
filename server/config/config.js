const path = require("path");
const process = require("process");

module.exports = {
  ELECTRON_DEV: {
    dialect: "sqlite",
    storage: path.join(__dirname, "../database/db.sqlite3"),
    logging: false
  },
  ELECTRON_PROD: {
    dialect: "sqlite",
    storage: path.join(process.resourcesPath, "backend/database/db.sqlite3"),
    logging: false
  }
};
