const categoryModel = require("../Model/categoryModel");

async function getAllCategories(req, res) {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Nepavyko gauti kategorijų" });
  }
}

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    await categoryModel.createCategory(name);
    res.json({ message: "Kategorija sukurta" });
  } catch (err) {
    res.status(500).json({ error: "Nepavyko sukurti kategorijos" });
  }
}

module.exports = { getAllCategories, createCategory };
