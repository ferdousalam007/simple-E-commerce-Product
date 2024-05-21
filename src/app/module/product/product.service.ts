import { Request, Response } from "express";
import ProductModel from "./product.model";
import { IProduct } from "./product.interface";




const createProductIntoDb=async(product:IProduct)=>{
    const result=await ProductModel.create(product);
    return result;
} 

export const productServices={
    createProductIntoDb
}