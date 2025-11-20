import express from "express"
import path from "path"
import categoryRoutes from "./routes/category.routes.js"
// import userRoutes from "./routes/user.routes.js"
// import supplierRoutes from "./routes/supplier.routes.js"
// import productRoutes from "./routes/product.routes.js"
// import orderRoutes from "./routes/order.routes.js"
// import inventoryRoutes from "./routes/inventory.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "src/views"))
app.use(express.static(path.join(process.cwd(), "src/public")))

app.use("/category", categoryRoutes)
// app.use("/users", userRoutes)
// app.use("/supplier", supplierRoutes)
// app.use("/product", productRoutes)
// app.use("/order", orderRoutes)
// app.use("/inventory", inventoryRoutes)

app.listen(5000, () => console.log("Frontend running on PORT 5000"))
