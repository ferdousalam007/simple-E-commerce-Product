import { Schema, model } from "mongoose";
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
const productSchema = new Schema<IProduct>({
  name: { type: String, required: [true, 'Product name is required'] },
  description: { type: String, required: [true, 'Product description required'] },
  price: { type: Number, required: [true, 'price value required'] },
  category: { type: String, required: [true, 'category is requred'] },
  tags: { type: [String], required: [true, 'tag are required'] },
  variants: { type: [VariantsSchema], required: [true, 'Variants are required'], },
  inventory: { type: InverntorySchema, required: [true, 'Inventory is required'] }
});

// Middleware to update the inStock status based on the quantity before saving the document
productSchema.pre('save', function (next) {
  if (this.inventory.quantity === 0) {
    this.inventory.inStock = false;
  } else {
    this.inventory.inStock = true;
  }
  next();
});

// Creating the Mongoose model from the productSchema
const ProductModel = model<IProduct>('Product', productSchema);

// Exporting the ProductModel for use in other parts of the application
export default ProductModel;
