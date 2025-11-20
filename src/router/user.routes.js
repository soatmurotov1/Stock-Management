import { Router } from "express";
import { register, verify, login, refresh, create, getAll, getOne, update, deleted, resetPassword } from "../controller/user.controller.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { validation } from "../middleware/validation.js";
import { createValidation, updateValidation, registerValidation, loginValidation, } from "../validation/user.validation.js";
import knex from "../db/knex.js";
const userRouter = Router()


userRouter.post("/register",validation(registerValidation), register)
userRouter.post("/verify", verify)
userRouter.post("/login",validation(loginValidation), login)
userRouter.post("/refresh", refresh)
userRouter.post("/resetPassword", resetPassword)


userRouter.post("/",authGuard(knex), roleGuard("admin", "warehouse_manager"),validation(createValidation), create)
userRouter.get("/",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getAll)
userRouter.get("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager", "user"), getOne)
userRouter.put("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"),validation(updateValidation), update)
userRouter.delete("/:id",authGuard(knex), roleGuard("admin", "warehouse_manager"), deleted)



export default userRouter


