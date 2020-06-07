"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Products', required: true }]
});
const Category = mongoose_1.default.model("categories", CategorySchema);
exports.default = Category;
//# sourceMappingURL=category.js.map