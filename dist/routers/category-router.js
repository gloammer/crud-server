"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category-controller"));
const router = express_1.default.Router();
const categoryController = new category_controller_1.default();
router.get("/list", categoryController.list);
router.get("/:id", categoryController.get);
router.post("/create", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);
module.exports = router;
//# sourceMappingURL=category-router.js.map