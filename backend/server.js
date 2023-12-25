import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
dotenv.config()

const port = process.env.PORT || 5500

connectDB()

const app = express()

app.get("/", (req, res) => {
  res.send("API Running...")
})

// API Routes
app.use("/api/products", productRoutes)

// Error Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
