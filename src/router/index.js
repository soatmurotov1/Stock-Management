import { Router } from "express";
import categoryRouter from "./category.routes.js";
import userRouter from "./user.routes.js";
import supplierRouter from "./supplier.routes.js";



const router = Router()

router.use("/category", categoryRouter)
router.use("/user", userRouter)
router.use("/supplier", supplierRouter)


export default router