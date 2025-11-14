import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  deleted,
} from "../controller/supplier.controller.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";
import { validation } from "../middleware/validation.js";
import {
  createValidation,
  updateValidation,
} from "../validation/supplier.validation.js";

const supplierRouter = Router();

supplierRouter.post(
  "/",
  authGuard,
  roleGuard("admin", "warehouse_manager", "user"),
  validation(createValidation),
  create
);
supplierRouter.get(
  "/",
  authGuard,
  roleGuard("admin", "user", "warehouse_manager"),
  getAll
);
supplierRouter.get(
  "/:id",
  authGuard,
  roleGuard("admin", "user", "warehouse_manager"),
  getOne
);
supplierRouter.put(
  "/:id",
  authGuard,
  roleGuard("admin", "warehouse_manager"),
  validation(updateValidation),
  update
);
supplierRouter.delete(
  "/:id",
  authGuard,
  roleGuard("admin", "warehouse_manager"),
  deleted
);

export default supplierRouter;
