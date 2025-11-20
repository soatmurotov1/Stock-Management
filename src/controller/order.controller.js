import db from "../db/knex.js";


const calculateTotalAndUpdateStock = async (products) => {
  let total_amount = 0

  for (const item of products) {
    const product = await db("products").where({ id: item.productId }).first()
    if (!product) {
      throw new Error(`Product with id ${item.productId} not found`)
    }

    if (product.quantity < item.quantity) {
      throw new Error(`Product ${product.name} is out of stock or insufficient quantity`)
    }

    total_amount += product.price * item.quantity

    await db("products")
      .where({ id: item.productId })
      .update({ quantity: product.quantity - item.quantity })
  }
  return total_amount
}


export const create = async (req, res, next) => {
  try {
    const { user_id, supplier_id, status, products, currency } = req.body
    if (!products || !products.length) {
      return res.status(400).json({ message: "Products array is required" })
    }
    const total_amount = await calculateTotalAndUpdateStock(products)
    const [order] = await db("orders").insert({ user_id, supplier_id, status, products: JSON.stringify(products), total_amount, currency }).returning("*")

    res.status(201).json(order)
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const getAll = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query
    page = Number(page)
    limit = Number(limit)
    const offset = (page - 1) * limit
    const query = db("orders").select("*")
    if (search) {
      query.where(function () { this.where("status", "ilike", `%${search}%`).orWhere("currency", "ilike", `%${search}%`)})
    }
    const orders = await query.limit(limit).offset(offset)
    const [{ count }] = await db("orders").modify((qb) => {
      if (search) {
        qb.where(function () {this.where("status", "ilike", `%${search}%`).orWhere("currency", "ilike", `%${search}%`)})
      }
    }).count()
    res.json({
      success: true,
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(count / limit),
      orders
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const getOne = async (req, res, next) => {
  try {
    const order = await db("orders").where({ id: req.params.id }).first()
    if (!order) return res.status(404).json({ message: "Order not found" })
    res.json(order)
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const updated = await db("orders").where({ id: req.params.id }).update(req.body).returning("*")
    if (!updated.length) return res.status(404).json({ message: "Order not found" })
    res.json(updated[0]);
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const deleted = await db("orders").where({ id: req.params.id }).del()
    if (!deleted) return res.status(404).json({ message: "Order not found" })
    res.json({ message: "Order deleted successfully" })
  } catch (error) {
    console.error(error);
    next(error)
  }
}




