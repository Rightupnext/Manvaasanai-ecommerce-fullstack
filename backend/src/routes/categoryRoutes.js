const express = require("express");
const {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { isAuthenticated, allowRoles } = require("../middleware/AuthMiddleware");

const router = express.Router();

// Category Routes
router.post("/", isAuthenticated, allowRoles("admin"), addCategory);
router.get("/", getAllCategories);
router.delete("/:id", isAuthenticated, allowRoles("admin"), deleteCategory);
router.put("/:id", isAuthenticated, allowRoles("admin"), updateCategory);

module.exports = router;
