import express from "express";
import CategoryController from "../controllers/category-controller";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/list", categoryController.list)
router.get("/:id", categoryController.get)
router.post("/create", categoryController.create)
router.put("/:id", categoryController.update)
router.delete("/:id", categoryController.delete)

module.exports = router;