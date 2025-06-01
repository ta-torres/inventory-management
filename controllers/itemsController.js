const db = require("../db/queries");

exports.getAllItems = async (req, res) => {
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

exports.getCreateItemForm = (req, res) => {
  res.send("Create item form");
};

exports.createItem = (req, res) => {
  res.send("Create item");
};

exports.getItemById = (req, res) => {
  res.send(`Item ${req.params.id}`);
};

exports.getEditItemForm = (req, res) => {
  res.send(`Edit item ${req.params.id} form`);
};

exports.updateItem = (req, res) => {
  res.send(`Update item ${req.params.id}`);
};

exports.deleteItem = (req, res) => {
  res.send(`Delete item ${req.params.id}`);
};
