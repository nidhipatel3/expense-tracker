const { Router } = require("express");
const { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../controllers/category");

const router = Router();

router.post("/addCategory", createCategory);
router.get("/getcategories", getCategories);
router.route("/:id")
      .patch(updateCategory)
      .delete(deleteCategory)
      .get(getCategoryById);

module.exports = router;