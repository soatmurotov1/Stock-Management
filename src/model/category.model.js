import mongoose, { model } from "mongoose";
import { v4 as uuidv4 } from "uuid";


const categorySchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
    }, { timestamps: true, _id: false }
)


const categoryModel = mongoose.model("category", categorySchema)
export default categoryModel