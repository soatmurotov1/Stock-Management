import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";


const productSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    categoryId: { type: String, ref: "category", required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    quantity: { type: Number, required: true, default: 0 }
  }, { timestamps: true }
)

const productModel = mongoose.model("product", productSchema)
export default productModel
