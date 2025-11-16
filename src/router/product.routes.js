import { Router } from "express";
import db from "../db/knex.js"; // sizning knex konfiguratsiyangiz

const router = Router();

// CREATE product
router.post("/", async (req, res) => {
  try {
    const { name, description, category_id, price, currency, sku, quantity } = req.body;
    const [product] = await db("products")
      .insert({ name, description, category_id, price, currency, sku, quantity })
      .returning("*");
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await db("products").select("*");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one product
router.get("/:id", async (req, res) => {
  try {
    const product = await db("products").where({ id: req.params.id }).first();
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const updated = await db("products")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
    if (!updated.length) return res.status(404).json({ message: "Product not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("products").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
