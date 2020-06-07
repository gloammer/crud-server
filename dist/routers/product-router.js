"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product-controller"));
const router = express_1.default.Router();
const productController = new product_controller_1.default();
router.get("/", productController.info);
router.get("/list", productController.list);
router.get("/:id", productController.get);
router.post("/create", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);
module.exports = router;
//# sourceMappingURL=product-router.js.map