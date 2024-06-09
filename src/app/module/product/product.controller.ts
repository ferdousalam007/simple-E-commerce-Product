// Import necessary modules and services
import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationWithZodSchema from './zod.products.schema.validation';
import ProductModel from './product.model';
import { SearchPayload } from './product.interface';
// Function to create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    // Extract product data from request body
    const bodyData = req.body;
    // Validate product data using Zod schema
    const zodparseData = productValidationWithZodSchema.parse(bodyData);
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
      data: err,
    });
  }
};

// Function to get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Get search term from query parameters
    const searchTerm = req.query.searchTerm;

    if (searchTerm) {
      const searchPayload: SearchPayload = {
        name: searchTerm as string,
      };
      // Search for products based on search term
      // const products = await ProductModel.find({
      //   $or: [
      //     { name: { $regex: searchTerm, $options: 'i' } },
      //     { description: { $regex: searchTerm, $options: 'i' } },
      //     { tags: { $elemMatch: { $regex: searchTerm, $options: 'i' } } },
      //   ],
      // });
      const products = await productServices.getAllProductsIntoDb(searchPayload)
      // Check if no products were found
      if (products && products.length === 0) {
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
      const products = await productServices.getAllProductsIntoDb({})
      if (products.length > 0) {
        res.status(200).json({
          success: true,
          message: "Products fetched successfully!",
          data: products,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No products found.",
        });
      }
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
    if (!result) {
      // Respond with 404 status code if product not found
      res.status(404).json({
        success: false,
        message: 'Product not found!',
        data: null,
      });
    } else {
      // Send product details if found
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    }
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
    const result = await productServices.deleteProductByIdInroDb(productId);

    // Check if the product was actually deleted
    if (result) {
      // Send deletion confirmation
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {

      res.status(404).json({
        success: false,
        message: 'Product not found to delete!',
        data: null,
      });
    }
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
    const bodyData = req.body;
    // Validate product data using Zod schema
    const zodparse = productValidationWithZodSchema.parse(bodyData);

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
    if (result) {
      // Send update confirmation with the updated product data
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Product not found to update!',
        data: null,
      })
    }
  } catch (err) {
    // Handle error and send failure response
    res.status(500).json({
      success: false,
      message: 'Product updated failed!',
      data: err,
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