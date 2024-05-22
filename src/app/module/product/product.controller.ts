import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationWithZodSchema from './zod.products.schema.validation';

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
      message: "product creation failed",
      data: null,
    });
  }
};

//get all products controller
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    if (searchTerm) {
      const result = await productServices.getAllProductsIntoDb(searchTerm);
      res.status(200).json({
        "success": true,
        "message": `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
      return;
    }

    const result = await productServices.getAllProductsIntoDb('');
    res.status(200).json({
      "success": true,
      "message": "Product fetched successfully!",
      data: result,

    });
  } catch (err) {
    res.status(500).json({
      "success": false,
      "message": "Product fetched failed!",
      data: null,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductByIdInroDb(productId);
    res.status(200).json(
      {
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      },
    );
  } catch (err) {
    console.log({
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
      zodparse.inventory.inStock = false
      const result = await productServices.updateProductByIdInroDb(
        productId,
        zodparse,
      );
      res.status(200).json({
        "success": true,
        "message": "Product updated successfully!",
        data: result,
      });
    } else {
      zodparse.inventory.inStock = true
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
