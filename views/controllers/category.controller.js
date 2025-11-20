import axios from "axios"
const API = "http://localhost:5000/category"

export const listPage = async (req, res) => {
    const { data } = await axios.get(API)
    res.render("category/list", { categories: data })
}

export const createPage = (req, res) => {
    res.render("category/create")
}

export const createCategory = async (req, res) => {
    await axios.post(API, req.body)
    res.redirect("/category")
}

export const editPage = async (req, res) => {
    const { data } = await axios.get(`${API}/${req.params.id}`)
    res.render("category/update", { category: data })
}

export const updateCategory = async (req, res) => {
    await axios.put(`${API}/${req.params.id}`, req.body)
    res.redirect("/category")
}
