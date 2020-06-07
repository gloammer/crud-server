import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Products', required: true }]
});

const Category = mongoose.model("categories", CategorySchema);

export default Category;