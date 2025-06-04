const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await db.getAllCategories();
    res.render("categories", {
      title: "Categories",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCreateCategoryForm = (req, res) => {
  res.render("create-category", {
    title: "Create New Category",
  });
};

exports.validateCreateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

exports.createCategory = async (req, res, next) => {
  // check for validation errors first
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if list is not empty render the form with errors
      const errorMessage = errors.array()[0].msg;

      return res.render("create-category", {
        title: "Create New Category",
        error: errorMessage,
        name: req.body.name,
        description: req.body.description,
      });
    }

    const { name, description } = req.body;
    await db.createCategory(name, description || "");
    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await db.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    const items = await db.getItemsByCategory(categoryId);

    res.render("category-detail", {
      title: category.name,
      category: category,
      items: items,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEditCategoryForm = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await db.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("edit-category", {
      title: "Edit Category",
      category: category,
    });
  } catch (error) {
    next(error);
  }
};

exports.validateUpdateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const category = await db.getCategoryById(categoryId);
      const errorMessage = errors.array()[0].msg;

      return res.render("edit-category", {
        title: "Edit Category",
        category: category,
        error: errorMessage,
        name: req.body.name,
        description: req.body.description,
      });
    }

    const { name, description } = req.body;
    await db.updateCategory(categoryId, name, description || "");
    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  // cascade delete all items
  try {
    const categoryId = req.params.id;
    const category = await db.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }
    const items = await db.getItemsByCategory(categoryId);

    await db.deleteCategory(categoryId);

    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
};
