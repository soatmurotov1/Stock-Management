import db from "../db/knex.js"


export const create = async (req, res, next) => {
  try {
    const { product_id, quantity, warehouseLocation, reorderLevel, status } = req.body
    if (!product_id || !quantity || !warehouseLocation) {
      return res.status(400).json({ message: "product_id, quantity va warehouseLocation majburiy" })
    }
    const product = await db("products").where({ id: product_id }).first()
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    const [inventory] = await db("inventory").insert({ product_id, quantity, warehouseLocation, reorderLevel, status }).returning("*")
    res.status(201).json(inventory)
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const getAll = async (req, res, next) => {
  try {
    const inven = await db("inventory").select("*")
    res.json({ count: inven.length, inven })
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const getOne = async (req, res, next) => {
  try {
    const inven = await db("inventory").where({ id: req.params.id }).first()
    if (!inven) return res.status(404).json({ message: "Inventory not found" })
    res.json(inven)
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const update = async (req, res, next) => {
  try {
    const { quantity, warehouseLocation, reorderLevel, status } = req.body
    const exists = await db("inventory").where({ id: req.params.id }).first()
    if (!exists) {
      return res.status(404).json({ message: "Inventory not found" })
    }
    const [updated] = await db("inventory").where({ id: req.params.id }).update(
        { quantity, warehouseLocation, reorderLevel, status, updatedAt: db.fn.now() }).returning("*");
    res.json(updated)
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const inven = await db("inventory").where({ id: req.params.id }).first()
    if (!inven) {
      return res.status(404).json({ message: "Inventory not found" })
    }
    await db("inventory").where({ id: req.params.id }).del()
    res.json({ message: "Inventory deleted successfully" })
  } catch (error) {
    console.error(error)
    next(error)
  }
}



