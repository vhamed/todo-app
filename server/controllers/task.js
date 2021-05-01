const models = require("../models");

module.exports.createProduct = (req, res) => {
  models.task
    .create(req.body)
    .then((product) => {
      if (!product) {
        return res.status(422).send({ msg: "Product could not be created." });
      }
      res.status(201).send(product);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};

module.exports.updateProduct = (req, res) => {
  models.task
    .update(req.body, {
      where: {
        ID: req.params.id
      }
    })
    .then(() => {
      return models.task.findByPk(req.params.id);
    })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};

module.exports.getProducts = (req, res) => {
  models.task
    .findAll({ order: [["IsActive", "DESC"]] })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};

module.exports.getProduct = (req, res) => {
  models.task
    .findByPk(req.params.id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send(e);
    });
};
