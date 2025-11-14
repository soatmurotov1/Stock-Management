import productModel from "../model/product.model.js";
import categoryModel from "../model/category.model.js";

export const create = async (req, res, next) => {
  try {
    const { name, description, categoryId, price, currency, sku, quantity } = req.body
    const existingCategory = await categoryModel.findById(categoryId)
    if (!existingCategory) {
      return res.status(400).json({ message: `Category topilmadi` })
    }
    const existingProduct = await productModel.findOne({ sku })
    if (existingProduct) {
      return res.status(400).json({ message: `Bu SKU bilan mahsulot allaqachon mavjud` })
    }
    const newProduct = await productModel.create({
      name,
      description,
      categoryId,
      price,
      currency,
      sku,
      quantity
    })

    res.status(201).json({ message: "Product created", product: newProduct })
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const getAll = async (req, res, next) => {
  try {
    const products = await productModel.find().populate("categoryId")
    res.status(200).json({ count: products.length, products })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productModel.findById(id).populate("categoryId")
    if (!product) {
      return res.status(404).json({ message: "Product topilmadi" })
    }
    res.status(200).json(product)
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body
    if (updateData.categoryId) {
      const category = await categoryModel.findById(updateData.categoryId);
      if (!category) return res.status(400).json({ message: "Category topilmadi" })
    }
    if (updateData.sku) {
      const existingProduct = await productModel.findOne({ sku: updateData.sku, _id: { $ne: id } })
      if (existingProduct) return res.status(400).json({ message: "Bu SKU bilan boshqa mahsulot mavjud" })
    }
    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    if (!updatedProduct) return res.status(404).json({ message: `not found product ` })
    res.status(200).json({ message: "Product updated", product: updatedProduct })
  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProduct = await productModel.findByIdAndDelete(id)
    if (!deletedProduct) return res.status(404).json({ message: `not found product` })
    res.status(200).json({ message: "Product deleted" })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

