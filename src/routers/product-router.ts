import express from "express";
import ProductController from "../controllers/product-controller";

const router = express.Router();
const productController = new ProductController();

router.get("/list", productController.list)
router.get("/:id", productController.get)
router.post("/create", productController.create)
router.put("/:id", productController.update)
router.delete("/:id", productController.delete)

module.exports = router;