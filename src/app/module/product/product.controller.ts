
import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationWithZodSchema from "./zod.products.schema.validation";


//create new  product controller
const createProduct = async (req: Request, res: Response) => {
    try {
        const {products:producData}= req.body;
        const zodparseData = productValidationWithZodSchema.parse(producData);
        const result = await productServices.createProductIntoDb(zodparseData)
        res.status(201).json(result);

    } catch (err) {
       res.status(500).json(err);
    }
}


//get all products controller
const getAllProducts= async (req: Request, res: Response) => {
    try {
        const { products } = req.body;

    } catch (err) {
        console.log(err)
    }
}

export const ProductController = {
    createProduct,getAllProducts
}