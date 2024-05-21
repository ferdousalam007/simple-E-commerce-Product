import { Request, Response } from 'express';
import { orderService } from './order.service';

//create new order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const { orders: orderData } = req.body;
    // const zodparseOrderData=orderValidationWithShema.parse(orderData)
    const result = await orderService.createOrder(orderData);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

//get all orders controller

export const orderController = {
  createOrder,
};
