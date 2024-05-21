import { Schema } from "mongoose";
import { IProduct, Inventory, Variants } from "./product.interface";


const VariantsSchema = new Schema<Variants>({
    type: { type: String, required: [true, 'type is required'] },
    value: { type: String, required: [true, 'value is required'] }

})
const InverntorySchema = new Schema<Inventory>({
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    inStock: { type: Boolean, required: [true, 'InStock is required'] }
})

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IProduct>({
    name: { type: String, required: [true, 'Product name is required'] },
    description: { type: String, required: [true, 'Product description required'] },
    price: { type: Number, required: [true, 'price value required'] },
    category: { type: String, required: [true, 'category is requred'] },
    tags: { type: [String], required: [true, 'tag are required'] },
    variants: { type: [VariantsSchema], required: [true, 'Variants are required'], },
    inventory: { type: InverntorySchema, required: [true, 'Inventory is required'] }
});
