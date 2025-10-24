const Category = require("../models/category");

// create category
async function createCategory(req, res) {
    const { name, color, description } = req.body;

    if (!name || !color) {
        res.status(400).json({ msg: "All fields are required" });
    }

    try {
        await Category.create({
            name,
            color,
            description
        })
        res.status(200).json({ msg: "category added successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// update category
async function updateCategory(req, res) {
    await Category.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            color: req.body.color,
            description: req.body.description
        });
    res.status(200).json({ msg: "category updated successfully" });
}

//delete category
async function deleteCategory(req, res) {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "category deleted successfully" });
}

// get all categories
async function getCategories(req, res) {
    const allCategories = await Category.find({});
    return res.json(allCategories);
}

// get category using id
async function getCategoryById(req, res) {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404).json({ error: "category not found" });
    }
    return res.json(category);
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
}