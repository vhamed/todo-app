const path = require("path");
const process = require("process");
const resourcesPath = process.resourcesPath || __dirname;

module.exports = {
  ELECTRON_DEV: {
    dialect: "sqlite",
    storage: path.join(__dirname, "../database/db.sqlite3"),
    logging: false
  },
  ELECTRON_PROD: {
    dialect: "sqlite",
    storage: path.join(resourcesPath, "server/database/db.sqlite3"),
    logging: false
  }
};
