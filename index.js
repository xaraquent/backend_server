
const express = require("express");
const app = express();

const cors = require("cors")

app.use(cors({ origin: "*" }))
app.use(express.json())

const mongoose = require("mongoose")

require('dotenv').config()
const url = process.env.mongodbURL

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },

})

const Product = mongoose.model("Product", productSchema)

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/products', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

app.get("/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404).send({ message: "Product not found" })
        return
    }

    res.send(product)
})

app.post('/product', async (req, res) => {
    const product = await Product.create(req.body)
    res.send(product)
})

app.listen(3000, async () => {
    console.log("Listening on port 3000")
    await mongoose.connect(url)
})

