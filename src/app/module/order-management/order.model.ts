import { Schema, model } from 'mongoose';
import { IOrderItem } from './order.interface';

const orderSchema = new Schema<IOrderItem>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = model<IOrderItem>('Order', orderSchema);
export default OrderModel;
