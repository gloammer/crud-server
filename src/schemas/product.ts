import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true }
});

const Product = mongoose.model("products", ProductSchema);

export default Product;