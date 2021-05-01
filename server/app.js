const express = require("express");
const PORT = 50505;

// models/
const models = require("./models");

// routes
// const auth = require(path.join(__dirname, "./routes/auth"));

const cors = require("cors");

const app = express();

const task = require(path.join(__dirname, "./routes/task"));

app.use(cors());

app.use("/tasks", task);

// app.use("/auth", auth);

module.exports.startServer = async () => {
  await models.sequelize.sync({ force: false });
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
};
