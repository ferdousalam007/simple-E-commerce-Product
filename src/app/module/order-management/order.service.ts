import { IOrderItem } from './order.interface';
import OrderModel from './order.model';

const createOrder = async (order: IOrderItem) => {
  const result = await OrderModel.create(order);
  return result;
};
export const orderService = {
  createOrder,
};
