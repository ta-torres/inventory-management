const pool = require("./pool");

async function getAllCategories() {
  const result = await pool.query("SELECT * FROM categories ORDER BY name");
  return result.rows;
}

async function getAllItems() {
  const result = await pool.query("SELECT * FROM items ORDER BY name");
  return result.rows;
}

module.exports = {
  getAllCategories,
  getAllItems,
};
