// Import necessary modules and services
import { Request, Response } from 'express';
import { orderService } from './order.service';
import orederValidationWithZodSchema from './zod.order.shema.validation'; // Note: There seems to be a typo in the import statement. It should probably be 'orederValidationWithZodSchema' instead of 'orederValidationWithZodSchema'.
import ProductModel from '../product/product.model';

// Function to create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    // Extract order data from request body
    const { orders: orderData } = req.body;
    // Validate order data using Zod schema
    const zodparseOrderData = orederValidationWithZodSchema.parse(orderData);
    // Find product by ID
    const product = await ProductModel.findById(zodparseOrderData.productId);
    // Check if product exists
    if (!product) {
      return;
    }
    // Check if there's enough inventory for the order
    if (product.inventory.quantity < zodparseOrderData.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    // Update product inventory and save changes
    if (product) {
      product.inventory.quantity -= zodparseOrderData.quantity;
      product.inventory.inStock = product.inventory.quantity > 0;
      await product.save();
      // Create order using service
      const result = await orderService.createOrder(zodparseOrderData);
      // Send successful response
      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
  } catch (err) {
    // Handle errors
    res.status(400).json({
      success: false,
      message: 'order failed',
    });
  }
};

// Function to get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Get email query parameter from request
    const email: string | undefined = req.query.email as string;
    // If email is provided, fetch orders for that email
    if (email) {
      const result = await orderService.getAllOrdersService(email);
      // Check if any orders were found
      if (result.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Order not found',
        });
      }
      // Send successful response with orders
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    }
    // If no email is provided, fetch all orders
    const result = await orderService.getAllOrdersService('');
    // Send successful response with all orders
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    // Handle errors
    res.status(400).json(error);
  }
};

// Export the order controller object containing both functions
export const orderController = {
  createOrder,
  getAllOrders,
};