import db from "../db/knex.js"; 


export const create = async (req, res, next) => {
  try {
    const { name, description, category_id, price, currency, sku, quantity } = req.body
    const [product] = await db("products").insert({ name, description, category_id, price, currency, sku, quantity }).returning("*")
    res.status(201).json(product)
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page)
    limit = Number(limit)
    const offset = (page - 1) * limit
    const query = db("products").select("*")
    if (search) {
      query.where(function () { this.where("name", "ilike", `%${search}%`).orWhere("sku", "ilike", `%${search}%`);
    })
  }
  const products = await query.limit(limit).offset(offset)
  const [{ count }] = await db("products").modify((qb) => {
    if (search) {
      qb.where(function () { this.where("name", "ilike", `%${search}%`).orWhere("sku", "ilike", `%${search}%`)})
    }
  }).count()
  res.json({
    success: true,
    page,
    limit,
    total: Number(count),
    totalPages: Math.ceil(count / limit),
    products
  })
} catch (error) {
  console.error(error);
  next(error)
}
}


export const getOne = async (req, res, next) => {
  try {
    const product = await db("products").where({ id: req.params.id }).first()
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json(product)
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const update = async (req, res, next) => {
  try {
    const updated = await db("products").where({ id: req.params.id }).update(req.body).returning("*")
    if (!updated.length) return res.status(404).json({ message: "Product not found" })
    res.json(updated[0])
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const deleted = await db("products").where({ id: req.params.id }).del()
    if (!deleted) return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error(error)
    next(error)
  }
}



