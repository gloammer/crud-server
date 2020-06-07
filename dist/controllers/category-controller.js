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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("../schemas/category"));
const product_controller_1 = __importDefault(require("./product-controller"));
const product_1 = __importDefault(require("../schemas/product"));
const _ = __importStar(require("lodash"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class CategoryController {
    constructor() {
        this.productController = new product_controller_1.default();
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listResp = [];
            const respon = yield category_1.default.find().then((categories) => categories);
            yield Promise.all(respon.map((val) => __awaiter(this, void 0, void 0, function* () {
                const productsId = val.get("products");
                if (productsId.length === 0) {
                    listResp.push(val);
                }
                yield Promise.all(productsId.map((id) => __awaiter(this, void 0, void 0, function* () {
                    yield product_1.default.findById(id.toString()).then((pr) => {
                        if (!!pr && pr.name) {
                            const resp = replace(val, id.toString(), pr);
                            listResp.push(resp);
                        }
                    });
                })));
            })));
            res.json(_.uniq(listResp));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            const listResp = [];
            const response = yield category_1.default.findById(_id.toString()).then((categories) => categories);
            const productsId = response.get("products");
            if (productsId.length === 0) {
                res.json(response);
            }
            yield Promise.all(productsId.map((id) => __awaiter(this, void 0, void 0, function* () {
                const product = yield product_1.default.findById(id.toString()).then((pr) => {
                    if (!!pr && pr.name) {
                        const resp = replace(response, id.toString(), pr);
                        if (resp.products != null) {
                            resp.products.forEach((element) => {
                                if (element.name) {
                                    listResp.push(resp);
                                }
                            });
                        }
                    }
                });
            })));
            const a = _.uniq(listResp)[0];
            const b = a.products.filter((v) => !!v.name);
            res.json({ name: a.name, products: b, _id: a._id });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (yield node_fetch_1.default("https://fllaass.df.r.appspot.com/create", {
                method: "POST",
                body: JSON.stringify(req.body),
                headers: { "Content-Type": "application/json" },
            })).text();
            res.send(response);
        });
    }
    update(req, res) {
        const _id = req.params.id;
        category_1.default.findByIdAndUpdate({ _id }, { $set: req.body })
            .then((category) => res.json(category))
            .catch((err) => res.json(err));
    }
    delete(req, res) {
        const _id = req.params.id;
        category_1.default.findOneAndDelete(_id)
            .then((category) => res.json(category))
            .catch((err) => res.json(err));
    }
}
function replace(object, searchID, obj) {
    const replacedObject = object;
    for (let i = 0; i < replacedObject.products.length; i++) {
        if (replacedObject.products[i] == null) {
            replacedObject.products[i] = {};
        }
        if (replacedObject.products[i].toString() === searchID)
            replacedObject.products[i] = obj;
    }
    return replacedObject;
}
exports.default = CategoryController;
//# sourceMappingURL=category-controller.js.map