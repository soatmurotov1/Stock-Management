import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/router/index.js"
import { errorHandler } from "./src/middleware/errorHeader.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050

app.use(express.json())
app.use(cors())

app.use("/", router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


