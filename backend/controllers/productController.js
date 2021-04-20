import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @ desc    Fetch all products
// @route    GET /api/products
// @acccess  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @ desc    Fetch single products
// @route    GET /api/products/:id
// @acccess  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @ desc    Delete product
// @route    Delete /api/products/:id
// @acccess  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @ desc    Create product
// @route    POST /api/products
// @acccess  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Product Name',
    price: 0,
    featuredImage: '/images/picture.png',
    artist: 'Unknown',
    category: 'Uncategorized',
    countInStock: 0,
    numReviews: 0,
    description: 'Description',
    productPictures: [],
    createdBy: req.user._id,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @ desc    Update product
// @route    PUT /api/products/:id
// @acccess  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    featuredImage,
    artist,
    category,
    countInStock,
    productPictures,
  } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.featuredImage = featuredImage
    product.artist = artist
    product.category = category
    product.countInStock = countInStock
    product.productPictures = productPictures

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
