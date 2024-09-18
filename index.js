const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.1 HW2 Template' });
});

// 1
async function fetchAllProducts() {
  let query = 'SELECT * FROM products';
  let result = await db.all(query, []);

  return { products: result };
}

app.get('/products', async (req, res) => {
  let response = await fetchAllProducts();
  return res.status(200).json(response);
});

// 2
async function fetchProductsByBrand(brand) {
  let query = 'SELECT * FROM products WHERE brand = ?';
  let result = await db.all(query, [brand]);

  return { products: result };
}

app.get('/products/brand/:brand', async (req, res) => {
  let brand = req.params.brand;
  let response = await fetchProductsByBrand(brand);
  res.status(200).json(response);
});

// 3
async function fetchProductsByCategory(category) {
  let query = 'SELECT * FROM products WHERE category = ?';
  let result = await db.all(query, [category]);

  return { products: result };
}

app.get('/products/category/:category', async (req, res) => {
  let category = req.params.category;
  let response = await fetchProductsByCategory(category);
  res.status(200).json(response);
});

// 4
async function fetchProductsByStock(stock) {
  let query = 'SELECT * FROM products WHERE stock = ?';
  let result = await db.all(query, [stock]);

  return { products: result };
}

app.get('/products/stock/:stocks', async (req, res) => {
  let stock = req.params.stocks;
  let response = await fetchProductsByStock(stock);
  res.status(200).json(response);
});

// Port
app.listen(PORT, () => {
  console.log('Server is running on Port 3000');
});
