// Import necessary modules and services
import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationWithZodSchema from './zod.products.schema.validation';
import ProductModel from './product.model';

// Function to create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    // Extract product data from request body
    const { products: producData } = req.body;
    // Validate product data using Zod schema
    const zodparseData = productValidationWithZodSchema.parse(producData);
    // Create product in database
    const result = await productServices.createProductIntoDb(zodparseData);
    // Send successful response
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    // Handle error and send failure response
    res.status(500).json({
      success: false,
      message: 'product creation failed',
      data: null,
    });
  }
};

// Function to get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Get search term from query parameters
    const searchTerm = req.query.searchTerm;

    if (searchTerm) {
      // Search for products based on search term
      const products = await ProductModel.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { tags: { $elemMatch: { $regex: searchTerm, $options: 'i' } } },
        ],
      });

      // Check if no products were found
      if (products.length === 0) {
        res.status(200).json({
          success: false,
          message: `No products found matching search term '${searchTerm}'.`,
          data: null,
        });
      } else {
        // Send products found
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully`,
          data: products,
        });
      }
    } else {
      // Fetch all products
      const products = await ProductModel.find({});
      res.status(200).json({
        success: true,
        message: 'All products fetched successfully!',
        data: products,
      });
    }
  } catch (err) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products.',
      data: null,
    });
  }
};

// Function to get a product by ID
const getProductById = async (req: Request, res: Response) => {
  try {
    // Extract product ID from request parameters
    const { productId } = req.params;
    // Fetch product from database
    const result = await productServices.getProductByIdInroDb(productId);
    // Send product details
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    // Handle error and send failure response
    res.status(500).json({
      success: false,
      message: 'Product fetched failed!',
      data: null,
    });
  }
};

// Function to delete a product by ID
const deleteProductById = async (req: Request, res: Response) => {
  try {
    // Extract product ID from request parameters
    const { productId } = req.params;
    // Delete product from database
    await productServices.deleteProductByIdInroDb(productId);
    // Send deletion confirmation
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    // Handle error and send failure response
    res.status(500).json({
      success: false,
      message: 'Product deleted failed!',
      data: null,
    });
  }
};

// Function to update a product by ID
const updateProductById = async (req: Request, res: Response) => {
  try {
    // Extract product ID and data from request parameters and body
    const { productId } = req.params;
    const { products: producData } = req.body;
    // Validate product data using Zod schema
    const zodparse = productValidationWithZodSchema.parse(producData);

    // Update product status based on quantity
    if (zodparse.inventory.quantity === 0) {
      zodparse.inventory.inStock = false;
    } else {
      zodparse.inventory.inStock = true;
    }

    // Update product in database
    const result = await productServices.updateProductByIdInroDb(
      productId,
      zodparse,
    );

    // Send update confirmation
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    // Handle error and send failure response
    res.status(500).json({
      success: false,
      message: 'Product updated failed!',
      data: null,
    });
  }
};

// Export all functions as part of the ProductController object
export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};