const { Router } = require("express");
const { createCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../controllers/category");
const { requireAuth } = require("../middlewares/authentication");

const router = Router();

router.post("/addCategory", requireAuth, createCategory);
router.get("/getcategories", requireAuth, getCategories);
router.route("/:id")
      .patch(requireAuth, updateCategory)
      .delete(requireAuth, deleteCategory)
      .get(requireAuth, getCategoryById);

module.exports = router;