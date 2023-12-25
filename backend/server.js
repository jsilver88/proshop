import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import products from "./data/products.js"
dotenv.config()

const port = process.env.PORT || 5500

connectDB()

const app = express()

app.get("/", (req, res) => {
  res.send("API Running...")
})

app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
