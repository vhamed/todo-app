"use strict";

const fs = require("fs");
const path = require("path");
let Sequelize = require("sequelize");
let basename = path.basename(__filename);

let config;

if (process.env.NODE_ENV === "NODE") {
  config = require("../config/config.js").ELECTRON_DEV;
} else {
  const { app } = require("electron");
  if (app.isPackaged) {
    config = require("../config/config.js").ELECTRON_PROD;
    console.log("ELECTRON_PROD");
  } else {
    config = require("../config/config.js").ELECTRON_DEV;
    console.log("ELECTRON_DEV");
  }
}

var db = {};

var sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // var model = sequelize["import"](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
