const pool = require("./pool");

async function getAllCategories() {
  const result = await pool.query("SELECT * FROM categories ORDER BY name");
  return result.rows;
}

async function getAllItems() {
  const result = await pool.query("SELECT * FROM items ORDER BY name");
  return result.rows;
}

async function createCategory(name, description) {
  const result = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
}

async function createItem(name, description, price, quantity, categoryId) {
  const result = await pool.query(
    "INSERT INTO items (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, price, quantity, categoryId]
  );
  return result.rows[0];
}

async function getCategoryById(id) {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

async function getItemById(id) {
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return result.rows[0];
}

async function getItemsByCategory(categoryId) {
  const result = await pool.query(
    "SELECT * FROM items WHERE category_id = $1 ORDER BY name",
    [categoryId]
  );
  return result.rows;
}

async function updateCategory(id, name, description) {
  const result = await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return result.rows[0];
}

module.exports = {
  getAllCategories,
  getAllItems,
  createCategory,
  createItem,
  getCategoryById,
  getItemById,
  getItemsByCategory,
  updateCategory,
};
