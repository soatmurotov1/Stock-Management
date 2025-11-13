import categoryModel from "../model/category.model.js";


export const create = async (req, res, next) => {
  try {
    const { name, description } = req.body
    if (!name || !description) {
      return res.status(400).json({ message: "Name and description required" })
    }
    const category = await categoryModel.create({ name, description })
    res.status(201).json({ category })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const categories = await categoryModel.find()
    res.status(200).send({ conunt: categories.length, categories: categories })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await categoryModel.findById(id)
    if (!category) {
      return res.status(404).json({ message: `category not found `})
    }
    res.status(200).json({ category })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    )
    if (!updatedCategory) {
      return res.status(404).json({ message: `category not found ` })
    }
    res.status(200).json({ updatedCategory })
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const deleted = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedCategory = await categoryModel.findByIdAndDelete(id)
    if (!deletedCategory) {
      return res.status(404).json({ message: `category not found `})
    }
    res.status(200).json({ message: `category deleted `})
  } catch (error) {
    console.error(error);
    next(error)
  }
}
