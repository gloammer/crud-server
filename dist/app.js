"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express_1.default();
const port = 8080;
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "/uploads")));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
console.log(path_1.default.join(__dirname, "..", "/uploads"));
// connect to db
mongoose_1.default
    .connect("mongodb+srv://Team06:TTD07KlWDvD59Zrp@test-cluster-ggkus.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));
const products = require("./routers/product-router");
const categories = require("./routers/category-router");
app.use("/about", products);
app.use("/products", products);
app.use("/category", categories);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map