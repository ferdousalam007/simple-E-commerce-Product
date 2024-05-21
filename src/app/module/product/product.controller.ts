import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationWithZodSchema from './zod.products.schema.validation';

//create new  product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const { products: producData } = req.body;
    const zodparseData = productValidationWithZodSchema.parse(producData);
    const result = await productServices.createProductIntoDb(zodparseData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all products controller
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    if (searchTerm) {
      const result = await productServices.getAllProductsIntoDb(searchTerm);
      res.status(200).json(result);
      return;
    }

    const result = await productServices.getAllProductsIntoDb('');
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductByIdInroDb(productId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { products: producData } = req.body;
    const zodparseData = productValidationWithZodSchema.parse(producData);
    const result = await productServices.updateProductByIdInroDb(
      productId,
      zodparseData,
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
