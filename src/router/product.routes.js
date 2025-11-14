import { Router } from "express";
import { create, getAll, getOne, update, deleted } from "../controller/product.controller.js";
import { validation } from "../middleware/validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { createValidation, updateValidation } from "../validation/product.validation.js";


const productRouter = Router();


productRouter.post("/",authGuard, roleGuard("admin", "user"), validation(createValidation), create)
productRouter.get("/", authGuard, roleGuard("admin", "user"), getAll)
productRouter.get("/:id", authGuard, roleGuard("admin", "user"), getOne)
productRouter.put("/:id", authGuard, roleGuard("admin", "user"), validation(updateValidation), update)
productRouter.delete("/:id", authGuard, roleGuard("admin", "user"), deleted)


export default productRouter
