import { Router } from "express";
import { create, getAll, getOne, update, deleted } from "../controller/supplier.controller.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { validation } from "../middleware/validation.js";
import { createValidation, updateValidation } from "../validation/supplier.validation.js";
import knex from "../db/knex.js";
const supplierRouter = Router()


supplierRouter.post("/",authGuard(knex), roleGuard("admin", "warehouse_manager"),validation(createValidation), create)
supplierRouter.get("/",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getAll)
supplierRouter.get("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getOne)
supplierRouter.put("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"), validation(updateValidation), update)
supplierRouter.delete("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"), deleted)


export default supplierRouter


