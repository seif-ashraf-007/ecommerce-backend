import Product from "./product.model.js";
import {
  deleteImageFiles,
  logProductId,
} from "../../utils/FileManagement.util.js";
import ErrorResponse from "../../utils/ErrorResponse.util.js";

// Get all products
export const getAllProducts = async () => {
  // product.service.js
  const products = await Product.find();
  if (!products) throw new ErrorResponse("Products not found", 404);
  return products;
};

// Get single product by ID
export const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new ErrorResponse("Product not found", 404);
  return product;
};

// Create a new Product
export const createProduct = async ({
  title,
  description,
  category,
  price,
  images,
}) => {
  const product = await Product.create({
    title,
    description,
    category,
    price,
    images,
  });

  if (!product) {
    throw new ErrorResponse("Failed to create a product", 404);
  }

  logProductId(product._id, "add");

  return product;
};

// Edit a product (Patch)
export const updateProductById = async (id, updates) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new ErrorResponse("Product not found", 404);
  }

  return updatedProduct;
};

// Delete a product
export const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ErrorResponse("Product not found", 404);
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new ErrorResponse("Product not found", 404);
  }

  // delete product images
  await deleteImageFiles(product.images);

  logProductId(id, "delete");

  return deletedProduct;
};
