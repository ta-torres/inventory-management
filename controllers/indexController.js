const db = require("../db/queries");

exports.getHomePage = async (req, res, next) => {
  try {
    const categories = await db.getAllCategories();
    res.render("index", {
      title: "Inventory Management",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};
