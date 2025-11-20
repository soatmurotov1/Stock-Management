import { Router } from "express"
import { listPage, createPage, createCategory, editPage, updateCategory } from "../controllers/category.controller.js"

const router = Router()

router.get("/", listPage)
router.get("/create", createPage)
router.post("/create", createCategory)

router.get("/edit/:id", editPage)
router.post("/edit/:id", updateCategory)

export default router
