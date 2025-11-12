import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import router from "./src/router/index.js";
// import { errorHandler } from "./src/middleware/errorHeander.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5050
const mongodb = process.env.MONGO_URL

app.use(express.json())
app.use(cors())

mongoose.connect(mongodb)
.then(() => console.log("mongodb connected"))
.catch((error) => console.log(`mongodb connection error: ${error}`))

// app.use("/", router)

// app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


