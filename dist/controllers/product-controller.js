"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../schemas/product"));
const category_1 = __importDefault(require("../schemas/category"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
const node_fetch_1 = __importDefault(require("node-fetch"));
class ProductController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { description, file, category, price, nameProduct } = req.body;
            const filePath = yield utils_1.saveFileBase64ToDisk(file);
            try {
                console.log(1);
                const product = yield new product_1.default({
                    name: nameProduct,
                    price,
                    description,
                    imagePath: filePath,
                }).save();
                console.log(2);
                const _id = category;
                yield category_1.default.findByIdAndUpdate({ _id }, {
                    $push: {
                        products: product._id,
                    },
                });
                console.log(3);
                res.json(product);
            }
            catch (err) {
                res.status(505).send("Что-то Сломалось" + err.toString());
            }
        });
    }
    info(req, res) {
        node_fetch_1.default("https://fllaass.df.r.appspot.com/about").then((a) => res.send(`
      <!DOCTYPE html>
<html>

<head>
  <title>About</title>
</head>

<body>

  <h1>About Us</h1>
  <p style="font-size: 20px;">
    Максим Алкеев 🛌 <br>
    Максим Кривощапов 🐕 <br>
    Денис Полушкин 👩‍💻 <br>
    Анастасия Голова 🐲 <br>
    Виктория Кудрявцева 🗑 <br>
  </p>

</body>

</html>
    `));
    }
    list(req, res) {
        product_1.default.find()
            .then((products) => {
            res.json(products);
        })
            .catch((err) => res.json(err));
    }
    getById(id) {
        let a;
        product_1.default.findById(id).then((product) => (a = product));
        return a;
    }
    get(req, res) {
        const _id = req.params.id;
        product_1.default.findById(_id)
            .then((product) => res.json(product))
            .catch((err) => res.json(err));
    }
    update(req, res) {
        const _id = req.params.id;
        product_1.default.findByIdAndUpdate({ _id }, { $set: req.body })
            .then((product) => res.json(product))
            .catch((err) => res.json(err));
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            const category = yield category_1.default.find().then((val) => val);
            const idList = [];
            category.map((val) => {
                idList.push(new mongoose_1.default.mongo.ObjectId(val.get("_id")));
            });
            console.log(idList);
            console.log(_id);
            idList.map((val) => __awaiter(this, void 0, void 0, function* () {
                yield category_1.default.update({ _id: new mongoose_1.default.mongo.ObjectId(val) }, {
                    $pull: {
                        products: { $in: [_id.toString()] },
                    },
                });
            }));
            product_1.default.findOneAndDelete(_id)
                .then((product) => res.json(product))
                .catch((err) => res.json(err));
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product-controller.js.map