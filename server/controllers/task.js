const models = require("../models");

module.exports.createTask = (req, res) => {
  models.task
    .create(req.body)
    .then((task) => {
      if (!task) {
        return res.status(422).send({ msg: "Task could not be created." });
      }
      res.status(201).send(task);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};

module.exports.updateTask = (req, res) => {
  models.task
    .update(req.body, {
      where: {
        ID: req.params.id
      }
    })
    .then(() => {
      return models.task.findByPk(req.params.id);
    })
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};

module.exports.getTasks = (req, res) => {
  models.task
    .findAll()
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};

module.exports.getTask = (req, res) => {
  models.task
    .findByPk(req.params.id)
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};

module.exports.deleteTask = (req, res) => {
  models.task
    .destroy(req.params.id)
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};
