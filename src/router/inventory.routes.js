import { Router } from "express";
import { create, getAll, getOne, update, deleted } from "../controller/inventory.controller.js";
import { validation } from "../middleware/validation.js";
import { createValidation, updateValidation } from "../validation/inventory.validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import knex from "../db/knex.js";


const inventoryRouter = Router()

inventoryRouter.post("/",authGuard(knex), validation(createValidation), create)
inventoryRouter.get("/",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getAll)
inventoryRouter.get("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getOne)
inventoryRouter.put("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"), validation(updateValidation), update)
inventoryRouter.delete("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"), deleted)


export default inventoryRouter

