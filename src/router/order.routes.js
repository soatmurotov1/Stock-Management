import { Router } from "express";
import { create, getAll, getOne, update, deleted } from "../controller/order.controller.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { validation } from "../middleware/validation.js";
import { createValidation, updateValidation } from "../validation/order.validation.js";
import knex from "../db/knex.js";

const orderRouter = Router()


orderRouter.post("/",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), validation(createValidation), create)
orderRouter.get("/", authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getAll)
orderRouter.get("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getOne)
orderRouter.put("/:id",authGuard(knex), roleGuard("admin", 'warehouse_manager'), validation(updateValidation), update)
orderRouter.delete("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"), deleted)


export default orderRouter

