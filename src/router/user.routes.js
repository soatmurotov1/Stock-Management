import { Router } from "express";
import db from "../db/knex.js";

const router = Router();

// CREATE user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const [user] = await db("users")
      .insert({ name, email, password, role })
      .returning("*");
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await db("users").select("*");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one user
router.get("/:id", async (req, res) => {
  try {
    const user = await db("users").where({ id: req.params.id }).first();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user
router.put("/:id", async (req, res) => {
  try {
    const updated = await db("users")
      .where({ id: req.params.id })
      .update(req.body)
      .returning("*");
    if (!updated.length) return res.status(404).json({ message: "User not found" });
    res.json(updated[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("users").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
