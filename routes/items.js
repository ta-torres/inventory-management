const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

// GET all items
router.get("/", itemsController.getAllItems);

// GET form to create new item
router.get("/new", itemsController.getCreateItemForm);

// POST create new item
router.post(
  "/",
  itemsController.validateCreateItem,
  itemsController.createItem
);

// GET single item by ID
router.get("/:id", itemsController.getItemById);

// GET form to edit item
router.get("/:id/edit", itemsController.getEditItemForm);

// POST update item
router.post("/:id/edit", itemsController.updateItem);

// POST delete item
router.post("/:id/delete", itemsController.deleteItem);

module.exports = router;
