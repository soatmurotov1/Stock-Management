import db from "../db/knex.js"



export const create = async (req, res, next) => {
  try {
    const { name, description } = req.body
    const [category] = await db("categories").insert({ name, description }).returning("*")
    res.status(201).json(category)
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const getAll = async (req, res, next) => {
  try {
    const categories = await db("categories").select("*")
    res.json({count: categories.length,  categories: categories})
  } catch (error) {
    console.log(error);
    next(error)
    }
}

export const getOne = async (req, res, next) => {
  try {
    const category = await db("categories").where({ id: req.params.id }).first()
    if (!category) return res.status(404).json({ message: "Category not found" })
    res.json(category)
  } catch (error) {
    console.log(error)
    next(error)
  }
}


export const update =  async (req, res, next) => {
  try {
    const updated = await db("categories").where({ id: req.params.id }).update(req.body).returning("*")
    if (!updated.length) return res.status(404).json({ message: "Category not found" })
    res.json(updated[0])
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const deleted = async (req, res, next) => {
  try {
    const deleted = await db("categories").where({ id: req.params.id }).del()
    if (!deleted) return res.status(404).json({ message: "Category not found" })
    res.json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error(error);
    next(error)
  }
}


