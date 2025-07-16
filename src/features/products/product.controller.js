import { success } from "zod";
import * as productService from "./product.service.js";

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get single product by ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Create a new Product
export const createProduct = async (req, res, next) => {
  try {
    let { title, description, category, price, images } = req.body;

    // Extract file names from req.files
    images = req.files?.map((file) => file.filename) || [];

    const product = await productService.createProduct({
      title,
      description,
      category,
      price,
      images,
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Edit a product (Patch)
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { title, description, category, price, images } = req.body;

    // Extract file names from req.files
    images = req.files?.map((file) => file.filename) || [];

    const updates = {
      title,
      description,
      category,
      price,
      images,
    };

    const product = await productService.updateProductById(id, updates);

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productService.deleteProduct(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
