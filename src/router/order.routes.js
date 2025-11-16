import { Router } from "express";
import db from "../db/knex.js";

const router = Router();

// CREATE order
router.post("/", async (req, res) => {
  try {
    const { user_id, supplier_id, status, products, total_amount, currency } = req.body;
    const [order] = await db("orders")
      .insert({ user_id, supplier_id, status, products, total_amount, currency })
      .returning("*");
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await db("orders").select("*");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one order
router.get("/:id", async (req, res) => {
  try {
    const order = await db("orders").where({ id: req.params.id }).first();
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE order
router.put("/:id", async (req, res) => {
  try {
    const updated = await db("orders")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
    if (!updated.length) return res.status(404).json({ message: "Order not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("orders").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
