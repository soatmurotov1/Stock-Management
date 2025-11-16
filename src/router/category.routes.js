import { Router } from "express";
import db from "../db/knex.js";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const [category] = await db("categories")
      .insert({ name, description })
      .returning("*");
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all
router.get("/", async (req, res) => {
  try {
    const categories = await db("categories").select("*");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one
router.get("/:id", async (req, res) => {
  try {
    const category = await db("categories").where({ id: req.params.id }).first();
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await db("categories")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
    if (!updated.length) return res.status(404).json({ message: "Category not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("categories").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
