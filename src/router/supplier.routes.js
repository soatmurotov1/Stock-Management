import { Router } from "express";
import db from "../db/knex.js";

const router = Router();

// CREATE supplier
router.post("/", async (req, res) => {
  try {
    const { name, contact_email, phone_number, address } = req.body;
    const [supplier] = await db("suppliers")
      .insert({ name, contact_email, phone_number, address })
      .returning("*");
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await db("suppliers").select("*");
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one supplier
router.get("/:id", async (req, res) => {
  try {
    const supplier = await db("suppliers").where({ id: req.params.id }).first();
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE supplier
router.put("/:id", async (req, res) => {
  try {
    const updated = await db("suppliers")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
    if (!updated.length) return res.status(404).json({ message: "Supplier not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE supplier
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("suppliers").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
