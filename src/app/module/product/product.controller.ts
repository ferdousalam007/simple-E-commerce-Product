import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationWithZodSchema from './zod.products.schema.validation';
import ProductModel from './product.model';

//create new  product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const { products: producData } = req.body;
    const zodparseData = productValidationWithZodSchema.parse(producData);
    const result = await productServices.createProductIntoDb(zodparseData);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'product creation failed',
      data: null,
    });
  }
};

//get all products controller

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (searchTerm) {
      const products = await ProductModel.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { tags: { $elemMatch: { $regex: searchTerm, $options: 'i' } } },
        ],
      });

      if (products.length === 0) {
        res.status(200).json({
          success: true,
          message: `No products found matching search term '${searchTerm}'.`,
          data: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully`,
          data: products,
        });
      }
    } else {
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

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductByIdInroDb(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Product fetched failed!',
      data: null,
    });
  }
};
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productServices.deleteProductByIdInroDb(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Product deleted failed!',
      data: null,
    });
  }
};
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { products: producData } = req.body;
    const zodparse = productValidationWithZodSchema.parse(producData);

    if (zodparse.inventory.quantity === 0) {
      zodparse.inventory.inStock = false;
      const result = await productServices.updateProductByIdInroDb(
        productId,
        zodparse,
      );
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    } else {
      zodparse.inventory.inStock = true;
      const result = await productServices.updateProductByIdInroDb(
        productId,
        zodparse,
      );
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Product updated failed!',
      data: null,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
