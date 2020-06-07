import { Request, Response } from "express-serve-static-core";
import Product from "../schemas/product";
import Category from "../schemas/category";
import mongoose, { Types, isValidObjectId } from "mongoose";
import { saveFileBase64ToDisk } from "../utils";

class ProductController {
  list(req: Request, res: Response) {
    Product.find()
      .then((products) => {
        res.json(products);
      })
      .catch((err) => res.json(err));
  }

  getById(id: string): Document {
    let a;
    Product.findById(id).then((product) => (a = product));
    return a;
  }

  get(req: Request, res: Response) {
    const _id: string = req.params.id;
    Product.findById(_id)
      .then((product) => res.json(product))
      .catch((err) => res.json(err));
  }

  create = async (req: Request, res: Response) => {
    const { description, file, category, price, nameProduct } = req.body;
    const filePath = await saveFileBase64ToDisk(file);
    try {
      console.log(1)
      const product = await (new Product({
        name: nameProduct,
        price,
        description,
        imagePath: filePath
      }).save())
      console.log(2)
      const _id: string = category;
      await Category.findByIdAndUpdate({ _id },
        {
          $push: {
            products: product._id
          }
        });
      console.log(3);
      res.json(product)
    }
    catch (err) {
      res.status(505).send("Что-то Сломалось" + err.toString())
    }
  }

  update(req: Request, res: Response) {
    const _id: string = req.params.id;
    Product.findByIdAndUpdate({ _id }, { $set: req.body })
      .then((product) => res.json(product))
      .catch((err) => res.json(err));
  }

  async delete(req: Request, res: Response) {
    const _id: string = req.params.id;

    const category = await Category.find().then(
      (val: mongoose.Document[]) => val
    );

    const idList: any[] = [];
    category.map((val: mongoose.Document) => {
      idList.push(new mongoose.mongo.ObjectId(val.get("_id")));
    });

    console.log(idList);
    console.log(_id);

    idList.map(async (val) => {
      await Category.update(
        { _id: new mongoose.mongo.ObjectId(val) },
        {
          $pull: {
            products: { $in: [_id.toString()] },
          },
        }
      );
    });

    Product.findOneAndDelete(_id)
      .then((product) => res.json(product))
      .catch((err) => res.json(err));
  }
}
export default ProductController;
