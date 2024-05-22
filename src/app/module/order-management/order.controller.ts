import { Request, Response } from 'express';
import { orderService } from './order.service';
import orederValidationWithZodSchema from './zod.order.shema.validation';
import ProductModel from '../product/product.model';

//create new order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const { orders: orderData } = req.body;
    const zodparseOrderData = orederValidationWithZodSchema.parse(orderData)
    const product = await ProductModel.findById(zodparseOrderData.productId);
    if (!product) {
      return 
    }
    if (product.inventory.quantity < zodparseOrderData.quantity) {
      return res.status(400).json({
        "success": false,
        "message": "product quantity is not enough"
      });
    }
    if (product) {
  
      product.inventory.quantity -=zodparseOrderData.quantity;
      product.inventory.inStock = product.inventory.quantity > 0;
      await product.save();
      const result = await orderService.createOrder(zodparseOrderData);
      res.status(201).json(result);
    }
   
  } catch (err) {
    res.status(400).json({
      "success": false,
      "message":"order failed"
    });

  }
};

//get all orders controller
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email: string | undefined = req.query.email as string;
    if (email) {
      const result = await orderService.getAllOrdersService(email)
      if (result.length === 0) {
        return  res.status(400).json({
          "success": false,
          "message": "Order not found"
        })
        
      }
    return  res.status(200).json(result);
    };
    const result = await orderService.getAllOrdersService("")
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }

}
export const orderController = {
  createOrder, getAllOrders
};
