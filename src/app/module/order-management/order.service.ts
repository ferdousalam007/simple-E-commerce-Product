import { IOrderItem } from './order.interface';
import OrderModel from './order.model';

const createOrder = async (order: IOrderItem) => {
  
  const result = await OrderModel.create(order);
  return result;
};
const getAllOrdersService=async(email:any)=>{
  
  if(email){
    const result=await OrderModel.find({ email: email });
    return result;
  }
  const result=await OrderModel.find();
    return result;
  // console.log(result);
  // return result;
}
export const orderService = {
  createOrder,
  getAllOrdersService
};
