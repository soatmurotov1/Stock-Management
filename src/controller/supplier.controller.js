import { Router } from "express";
import db from "../db/knex.js"

const supplierRouter = Router()


export const create = async (req, res, next) => {
  try {
    const { name, contact_email, phone_number, address } = req.body
    const [supplier] = await db("suppliers").insert({ name, contact_email, phone_number, address }).returning("*")
    res.status(201).json({conunt: supplier.length, supplier: supplier})
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const getAll = async (req, res, next) => {
  try {
    const suppliers = await db("suppliers").select("*")
    res.json({count: suppliers.length, suppliers: suppliers })
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const getOne = async (req, res, next) => {
  try {
    const supplier = await db("suppliers").where({ id: req.params.id }).first()
    if (!supplier) return res.status(404).json({ message: "Supplier not found" })
    res.json(supplier)
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const update = async (req, res, next) => {
  try {
    const updated = await db("suppliers").where({ id: req.params.id }).update(req.body).returning("*")
    if (!updated.length) return res.status(404).json({ message: "Supplier not found" })
    res.json(updated[0])
  } catch (error) {
    console.error(error)
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const deleted = await db("suppliers").where({ id: req.params.id }).del()
    if (!deleted) return res.status(404).json({ message: "Supplier not found" })
    res.json({ message: "Supplier deleted successfully" })
  } catch (error) {
    console.error(error);
    next(error)
  }
}




