import orderModel from "../model/order.model.js";
import productModel from "../model/product.model.js";


export const create = async (req, res, next) => {
  try {
    const { userId, supplierId, status, products, currency } = req.body
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array bo'lishi kerak" })
    }
    let totalAmount = 0
    for (let item of products) {
      const product = await productModel.findById(item.productId)
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} topilmadi` })
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `${product.name} mahsuloti omborda yetarli emas` })
      }
      totalAmount += item.quantity * product.price
      product.quantity -= item.quantity
      await product.save()
    }

    const newOrder = new orderModel({
      userId,
      supplierId,
      status,
      products,
      totalAmount,
      currency
    })
    await newOrder.save()
    res.status(201).json({ message: "Order muvaffaqiyatli yaratildi", order: newOrder })
  } catch (error) {
    console.log(error);
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const orders = await orderModel.find()
    res.status(200).json({ count: orders.length, orders })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id)
    if (!order) return res.status(404).json({ message: `not found order ` })
    res.status(200).json({ order })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const role = req.user.role
    if (!["admin", "warehouse_manager"].includes(role)) {
      return res.status(403).json({ message: "Siz bu amalni bajarishga haqli emassiz" })
    }

    const order = await orderModel.findById(req.params.id)
    if (!order) return res.status(404).json({ message: "Order topilmadi" })

    if (!Array.isArray(order.products)) {
      order.products = []  
    }

    if (req.body.products) {

      if (!Array.isArray(req.body.products)) {
        return res.status(400).json({ message: "products massiv bo'lishi kerak" })
      }

      for (let item of order.products) {
        const product = await productModel.findById(item.productId)
        if (product) {
          product.quantity += item.quantity
          await product.save()
        }
      }

      let totalAmount = 0
      for (let item of req.body.products) {
        const product = await productModel.findById(item.productId)
        if (!product) {
          return res.status(404).json({ message: `Product ${item.productId} topilmadi` })
        }
        if (product.quantity < item.quantity) {
          return res.status(400).json({ message: `${product.name} mahsuloti omborda yetarli emas` })
        }
        totalAmount += item.quantity * product.price
        product.quantity -= item.quantity
        await product.save()
      }

      req.body.totalAmount = totalAmount
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: "Order yangilandi", order: updatedOrder })

  } catch (error) {
    console.error(error);
    next(error)
  }
}


export const deleted = async (req, res, next) => {
  try {
    const role = req.user.role
    if (!["admin", "warehouse_manager"].includes(role)) {
      return res.status(403).json({ message: "Siz bu amalni bajarishga haqli emassiz" });
    }
    const order = await orderModel.findById(req.params.id)
    if (!order) return res.status(404).json({ message: `not found order ` })
    for (let item of order.products) {
      const product = await productModel.findById(item.productId)
      if (product) {
        product.quantity += item.quantity
        await product.save()
      }
    }

    await orderModel.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: `order deleted ` })
  } catch (error) {
    console.error(error);
    next(error)
  }
}



