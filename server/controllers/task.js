const { Op } = require("sequelize");
const models = require("../models");

module.exports.createTask = async (req, res) => {
  try {
    const task = await models.task.create(req.body);
    res.status(201).send(task);
  } catch (e) {
    console.log("not created");
    res.status(500).send(e);
  }
};

module.exports.updateTask = async (req, res) => {
  console.log("updateTask");
  console.log("req.body", req.body);
  try {
    await models.task.update(req.body, {
      where: {
        ID: req.params.id
      }
    });
    let task = await models.task.findByPk(req.params.id);
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
};

// const isDateBeforeToday = (date) => {
//   return new Date(date.toDateString()) < new Date(new Date().toDateString());
// };

module.exports.getTasks = async (req, res) => {
  // new Date();
  let where = {
    createdAt: {
      [Op.gt]: new Date()
    }
  };
  try {
    let tasks = await models.task.findAll();
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports.getTask = async (req, res) => {
  try {
    let task = await models.task.findByPk(req.params.id);
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    let task = models.task.destroy({ where: { id: req.params.id } });
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
};
