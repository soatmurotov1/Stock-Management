import { Router } from "express";
import categoryRouter from "./category.routes.js";
import userRouter from "./user.routes.js";
import supplierRouter from "./supplier.routes.js";
import productRouter from "./product.routes.js";
import orderRouter from "./order.routes.js";
// import orderItem from "./order_item.routes.js"


const router = Router()

router.use("/category", categoryRouter)
router.use("/user", userRouter)
router.use("/supplier", supplierRouter)
router.use("/product", productRouter)
router.use("/order", orderRouter)
// router.use("order_item", orderItem)

export default router