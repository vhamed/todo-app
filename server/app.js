const express = require("express");
const path = require("path");
const PORT = 50505;

// models/
const models = require("./models");

// routes
// const auth = require(path.join(__dirname, "./routes/auth"));

const cors = require("cors");

const app = express();

const task = require(path.join(__dirname, "./routes/task"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/tasks", task);

// app.use("/auth", auth);

const startServer = async () => {
  await models.sequelize.sync({ force: false });
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
};

startServer();

module.exports = { startServer };
