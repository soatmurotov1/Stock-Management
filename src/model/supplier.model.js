import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const supplierSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, trim: true },
    contactEmail: { type: String, unique: true, required: true},
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true, _id: false }
)


const SupplierModel = mongoose.model("supplier", supplierSchema)
export default SupplierModel
