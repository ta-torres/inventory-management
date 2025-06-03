const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await db.getAllItems();
    res.render("items", {
      title: "Items",
      items: items,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCreateItemForm = async (req, res, next) => {
  try {
    const categories = await db.getAllCategories();
    res.render("create-item", {
      title: "Create New Item",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.validateCreateItem = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Item name must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than 0")
    .toFloat(),
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than 0")
    .toInt(),
  body("category_id")
    .notEmpty()
    .withMessage("Please select a category")
    .isInt({ min: 1 })
    .withMessage("Invalid category selected")
    .toInt(),
];

exports.createItem = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories(); // need to fetch categories again for the form
      const errorMessage = errors.array()[0].msg;

      return res.render("create-item", {
        title: "Create New Item",
        categories: categories,
        error: errorMessage,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category_id: req.body.category_id,
      });
    }

    const { name, description, price, quantity, category_id } = req.body;

    await db.createItem(
      name,
      description || "",
      price || 0,
      quantity || 0,
      category_id
    );

    res.redirect("/items");
  } catch (error) {
    next(error);
  }
};

exports.getItemById = (req, res) => {
  res.send(`Item ${req.params.id}`);
};

exports.getEditItemForm = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await db.getItemById(itemId);
    const categories = await db.getAllCategories();

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("edit-item", {
      title: "Edit Item",
      item: item,
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.validateUpdateItem = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Item name must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than 0")
    .toFloat(),
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than 0")
    .toInt(),
  body("category_id")
    .notEmpty()
    .withMessage("Please select a category")
    .isInt({ min: 1 })
    .withMessage("Invalid category selected")
    .toInt(),
];

exports.updateItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const item = await db.getItemById(itemId);
      const categories = await db.getAllCategories();
      const errorMessage = errors.array()[0].msg;

      return res.render("edit-item", {
        title: "Edit Item",
        item: item,
        categories: categories,
        error: errorMessage,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category_id: req.body.category_id,
      });
    }

    const { name, description, price, quantity, category_id } = req.body;

    await db.updateItem(
      itemId,
      name,
      description || "",
      price || 0,
      quantity || 0,
      category_id
    );

    res.redirect("/items");
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = (req, res) => {
  res.send(`Delete item ${req.params.id}`);
};
