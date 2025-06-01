#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
-- categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- items table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    quantity INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

-- reset tables
-- after deleting data the auto-increment id doesn't reset automatically
-- TRUNCATE deletes all rows and resets serial sequence. CASCADE is for foreign keys
TRUNCATE items, categories RESTART IDENTITY CASCADE;

-- sample categories
INSERT INTO categories (name, description) VALUES 
('Electronics', 'Electronic devices and gadgets'),
('Books', 'Books and educational materials'),
('Clothing', 'Apparel and fashion accessories'),
('Home & Garden', 'Home improvement and gardening supplies'),
('Sports', 'Sports equipment and accessories');

-- sample items
INSERT INTO items (name, description, price, quantity, category_id) VALUES 
('Laptop', 'High-performance gaming laptop', 999.99, 5, 1),
('Smartphone', 'Latest Android smartphone', 699.99, 12, 1),
('Wireless Headphones', 'Noise-cancelling bluetooth headphones', 199.99, 8, 1),
('JavaScript Guide', 'Complete guide to modern JavaScript', 29.99, 15, 2),
('Python Cookbook', 'Advanced Python programming techniques', 34.99, 10, 2),
('Web Development Book', 'Full-stack web development guide', 39.99, 7, 2),
('Cotton T-Shirt', 'Comfortable cotton t-shirt in various colors', 19.99, 50, 3),
('Jeans', 'Classic blue denim jeans', 49.99, 25, 3),
('Sneakers', 'Comfortable running sneakers', 79.99, 15, 3),
('Garden Hose', '50ft expandable garden hose', 29.99, 20, 4),
('Plant Pot Set', 'Set of 5 ceramic plant pots', 24.99, 30, 4),
('Basketball', 'Official size basketball', 24.99, 12, 5),
('Tennis Racket', 'Professional tennis racket', 89.99, 6, 5);
`;

async function main() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://user:password@localhost:5432/database_name",
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();
