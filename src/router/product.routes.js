import { Router } from "express";
import { create, getAll, getOne, update, deleted } from "../controller/product.controller.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { validation } from "../middleware/validation.js";
import { createValidation, updateValidation} from "../validation/product.validation.js";
import knex from "../db/knex.js";
const productRouter = Router()

productRouter.post("/",authGuard(knex), roleGuard("admin", "warehouse_manager"), validation(createValidation), create)
productRouter.get("/",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getAll)
productRouter.get("/:id", authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getOne)
productRouter.put("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"),validation(updateValidation), update)
productRouter.delete("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"), deleted)


export default productRouter

