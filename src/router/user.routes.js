import { Router } from "express";
import {
  register,
  verify,
  login,
  create,
  getAll,
  getOne,
  update,
  deleted,
} from "../controller/user.controller.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import {
  registerValidation,
  loginValidation,
  createValidation,
  updateValidation,
} from "../validation/user.validation.js";
import { validation } from "../middleware/validation.js";

const userRouter = Router();

userRouter.post("/register", validation(registerValidation), register);
userRouter.post("/verify", verify);
userRouter.post("/login", validation(loginValidation), login);

userRouter.post(
  "/",
  authGuard,
  roleGuard("admin", "user"),
  validation(createValidation),
  create
);
userRouter.get(
  "/",
  authGuard,
  roleGuard("admin", "warehouse_manager", "user"),
  getAll
);
userRouter.get(
  "/:id",
  authGuard,
  roleGuard("admin", "warehouse_manager"),
  getOne
);
userRouter.put(
  "/:id",
  authGuard,
  roleGuard("admin", "user"),
  validation(updateValidation),
  update
);
userRouter.delete("/:id", authGuard, roleGuard("admin"), deleted);

export default userRouter;
