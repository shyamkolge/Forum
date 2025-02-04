import express from "express";
import { 
  createCategory, 
  getCategories, 
  getCategoryBySlug, 
  updateCategory, 
  deleteCategory 
} from "../controllers/categories.controller.js";



const router = express.Router();

router.post("/", createCategory);
router.get("/get", getCategories);
router.get("/:slug", getCategoryBySlug);
router.put("/:slug", updateCategory);
router.delete("/:slug", deleteCategory);

export default router;

