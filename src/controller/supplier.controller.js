import SupplierModel from "../model/supplier.model.js";

export const create = async (req, res, next) => {
  try {
    const data = req.validatedData
    const existing = await SupplierModel.findOne({ contactEmail: data.contactEmail })
    if (existing) {
      return res.status(400).json({ message: "Bu email bilan supplier allaqachon mavjud" })
    }
    const supplier = await SupplierModel.create(data)
    res.status(201).json({
      message: `supplier created`,
      data: supplier,
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}


export const getAll = async (req, res, next) => {
  try {
    const suppliers = await SupplierModel.find()
    res.status(200).json({
      message: "get all supplier",
      count: suppliers.length,
      data: suppliers,
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: `Supplier not found ID ${req.params.id}` });
    }
    res.status(200).json({ message: "Supplier topildi", data: supplier });
  } catch (error) {
    console.log(error);
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const data = req.validatedData
    const supplier = await SupplierModel.findById(req.params.id)
    if (!supplier) {
      return res.status(404).json({ message: `Supplier not foound ID ${req.params.id}` })
    }
    Object.assign(supplier, data)
    await supplier.save()
    res.status(200).json({ message: `supplier updeted`, data: supplier })
  } catch (error) {
    console.log(error)
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const supplier = await SupplierModel.findByIdAndDelete(req.params.id)
    if (!supplier) {
      return res.status(404).json({ message: `Supplier topilmadi: ID ${req.params.id}` })
    }
    res.status(200).json({ message: `supplier deleted`})
  } catch (error) {
    console.log(error);
    next(error)
  }
}


