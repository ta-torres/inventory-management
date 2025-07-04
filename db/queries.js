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

async function updateItem(id, name, description, price, quantity, categoryId) {
  const result = await pool.query(
    "UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6 RETURNING *",
    [name, description, price, quantity, categoryId, id]
  );
  return result.rows[0];
}

async function deleteCategory(id) {
  // ON DELETE CASCADE on the db schema deletes all rows in a child table when a row in the parent table is deleted
  // items table: category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

async function deleteItem(id) {
  const result = await pool.query(
    "DELETE FROM items WHERE id = $1 RETURNING *",
    [id]
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
  updateItem,
  deleteCategory,
  deleteItem,
};
