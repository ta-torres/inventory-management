const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const { requireAdmin } = require("../middleware/adminAuth");

// GET all categories
router.get("/", categoriesController.getAllCategories);

// GET form to create new category
router.get("/new", categoriesController.getCreateCategoryForm);

// POST create new category
router.post(
  "/",
  categoriesController.validateCreateCategory,
  categoriesController.createCategory
);

// GET single category by ID
router.get("/:id", categoriesController.getCategoryById);

// GET form to edit category
router.get("/:id/edit", requireAdmin, categoriesController.getEditCategoryForm);

// POST update category
router.post(
  "/:id/edit",
  requireAdmin,
  categoriesController.validateUpdateCategory,
  categoriesController.updateCategory
);

// POST delete category
router.post("/:id/delete", requireAdmin, categoriesController.deleteCategory);

module.exports = router;
