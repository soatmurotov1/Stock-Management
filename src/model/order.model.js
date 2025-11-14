import mongoose, { now } from "mongoose";


const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    supplierId: { type: String, required: true },
    orderDate: { type: Date, default: Date.now() },
    status: { type: String, required: true },
    products: [
      {
        productId: { type: String, ref: "product", required: true },
        quantity: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  { timestamps: true }
)

const orderModel = mongoose.model("order", orderSchema)
export default orderModel

