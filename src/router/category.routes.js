import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  deleted,
} from "../controller/category.controller.js";
import { validation } from "../middleware/validation.js";
import {
  createValidation,
  updateValidation,
} from "../validation/category.validation.js";
import { authGuard, roleGuard } from "../middleware/guard.middleware.js";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  authGuard,
  roleGuard("admin", "warehouse_manager"),
  validation(createValidation),
  create
);
categoryRouter.get(
  "/",
  authGuard,
  roleGuard("admin", "user", "warehouse_manager"),
  getAll
);
categoryRouter.get(
  "/:id",
  authGuard,
  roleGuard("admin", "user", "warehouse_manager"),
  getOne
);
categoryRouter.put(
  "/:id",
  authGuard,
  roleGuard("admin", "warehouse_manager"),
  validation(updateValidation),
  update
);
categoryRouter.delete(
  "/:id",
  authGuard,
  roleGuard("admin", "warehouse_manager"),
  deleted
);

export default categoryRouter;
