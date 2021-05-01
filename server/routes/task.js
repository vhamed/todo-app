const express = require("express");
const { validator } = require("../middlewares/validators");
const product = express.Router();
const models = require("../models");
const {
  getProducts,
  getProduct,
  getProductHistory,
  createProduct,
  updateProduct
} = require("../controllers/product");

// Get /products
product.get("/", getProducts);

// GET /products/:id
product.get(
  "/:id",
  param("id", "invalid product id")
    .trim()
    .isUUID()
    .custom((value) => {
      return models.product.findByPk(value).then((product) => {
        if (!product) {
          return Promise.reject("Produit n'existe pas");
        }
      });
    }),
  validator,
  getProduct
);

// GET /products/:id/history
product.get(
  "/:id/history",
  param("id", "invalid product id")
    .trim()
    .isUUID()
    .custom((value) => {
      return models.product.findByPk(value).then((product) => {
        if (!product) {
          return Promise.reject("Produit n'existe pas");
        }
      });
    }),
  validator,
  getProductHistory
);

// POST /products
product.post(
  "/",
  [
    body("Name", "Nom Aux moins 3 lettres")
      .trim()
      .isLength({ min: 3, max: 50 })
      .custom((value) => {
        return models.product
          .findOne({
            attributes: ["ID", "Name"],
            where: {
              Name: value
            }
          })
          .then((product) => {
            if (product) {
              return Promise.reject("Nom du produit existe déja");
            }
          });
      }),
    body("Qty", "Quantité aux moins 0").isInt({
      min: 0
    }),
    body("StockThreshold", "Stock Alerte aux moins 0")
      .optional()
      .isInt({ min: 0 }),
    body("IsActive", "Status d'article").optional().trim().isBoolean(),
    body("Barcode", "CodeBarre entre 1 et 50 ")
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .custom((value) => {
        return models.product
          .findOne({
            attributes: ["ID"],
            where: {
              Barcode: value
            }
          })
          .then((product) => {
            if (product) {
              return Promise.reject("CodeBarre existe déja");
            }
          });
      }),
    body("IsLoyalble", "Inclus dans Fidélité").optional().trim().isBoolean(),
    body("IsFavorite", "Article Favoris").optional().trim().isBoolean(),
    body("Picture", "Le lien d'image entre 1 et 255")
      .optional()
      .trim()
      .isLength({ min: 1, max: 255 })
  ],
  validator,
  createProduct
);

//PUT /products/:id
product.put(
  "/:id",
  [
    param("id", "invalid product id")
      .trim()
      .isUUID()
      .custom((value) => {
        return models.product
          .findByPk(value, {
            attributes: ["ID"]
          })
          .then((product) => {
            if (!product) {
              return Promise.reject("Produit n'existe pas");
            }
          });
      }),
    body("Name", "Nom Aux moins 3 lettres")
      .optional()
      .trim()
      .isLength({ min: 3, max: 50 })
      .custom((value, { req }) => {
        return models.product
          .findOne({
            attributes: ["ID"],
            where: {
              Name: value
            }
          })
          .then((product) => {
            if (product) {
              if (product && product.ID && product.ID !== req.params.id) {
                return Promise.reject("Nom du produit existe déja");
              }
            }
          });
      }),
    body("Qty", "Quantité aux moins 0").optional().isInt({
      min: 0
    }),
    body("StockThreshold", "Stock Alerte plus que 0")
      .optional()
      .isInt({ min: 0 }),
    body("IsActive", "Status d'article").optional().trim().isBoolean(),
    body("Barcode", "CodeBarre entre 1 et 50 ")
      .optional({ nullable: true })
      .trim()
      .isLength({ min: 1, max: 50 })
      .custom((value, { req }) => {
        return models.product
          .findOne({
            attributes: ["ID"],
            where: {
              Barcode: value
            },
            raw: true
          })
          .then((product) => {
            if (product) {
              if (product && product.ID && product.ID !== req.params.id) {
                return Promise.reject("CodeBarre existe déja");
              }
            }
          });
      }),
    body("IsLoyalble", "Inclus dans Fidélité").optional().trim().isBoolean(),
    body("IsFavorite", "Article Favoris").optional().trim().isBoolean(),
    body("Picture", "Le lien d'image entre 1 et 255")
      .optional({ nullable: true })
      .trim()
      .isLength({ min: 1, max: 255 })
  ],
  validator,
  updateProduct
);

module.exports = product;
