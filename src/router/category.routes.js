import { Router } from "express";
import { create, getAll, getOne, update, deleted } from "../controller/category.controller.js"
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { validation } from "../middleware/validation.js";
import { createValidation, updateValidation } from "../validation/category.validation.js";
import knex from "../db/knex.js";

const categoryRouter = Router()

categoryRouter.post("/",authGuard(knex), roleGuard("admin"),validation(createValidation), create)
categoryRouter.get("/",authGuard(knex), roleGuard("admin", "user"),  getAll)
categoryRouter.get("/:id",authGuard(knex), roleGuard("admin", "user"), getOne)
categoryRouter.put("/:id",authGuard(knex), roleGuard("admin"),validation(updateValidation), update)
categoryRouter.delete("/:id",authGuard(knex), roleGuard("admin"), deleted)


export default categoryRouter



