const db = require("../db/queries");

exports.getAllCategories = async (req, res) => {
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
  res.send("Create category form");
};

exports.createCategory = (req, res) => {
  res.send("Create category");
};

exports.getCategoryById = (req, res) => {
  res.send(`Category ${req.params.id}`);
};

exports.getEditCategoryForm = (req, res) => {
  res.send(`Edit category ${req.params.id} form`);
};

exports.updateCategory = (req, res) => {
  res.send(`Update category ${req.params.id}`);
};

exports.deleteCategory = (req, res) => {
  res.send(`Delete category ${req.params.id}`);
};
