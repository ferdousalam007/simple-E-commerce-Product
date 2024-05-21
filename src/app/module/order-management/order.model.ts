import { Schema } from "mongoose";
import { OrderItem } from "./order.interface";

const orderSchema = new Schema<OrderItem>({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

})



