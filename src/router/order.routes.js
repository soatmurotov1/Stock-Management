import { Router } from "express";
import { create, getAll, getOne, update, deleted } from "../controller/order.controller.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { createValidation, updateValidation } from "../validation/order.validation.js";
import { validation } from "../middleware/validation.js";


const orderRouter = Router()


orderRouter.post("/", authGuard, roleGuard("admin", "user"), validation(createValidation), create)
orderRouter.get("/",authGuard, roleGuard("admin", "user"), getAll)
orderRouter.get("/:id",authGuard, roleGuard("admin", "user"), getOne)
orderRouter.put("/:id",authGuard, roleGuard("admin", "user"), validation(updateValidation), update)
orderRouter.delete("/:id",authGuard, roleGuard("admin", "user"), deleted)


export default orderRouter