import { Schema, model } from 'mongoose';
import { IProduct, Inventory, Variants } from './product.interface';

const VariantsSchema = new Schema<Variants>({
  type: { type: String, required: [true, 'type is required'] },
  value: { type: String, required: [true, 'value is required'] },
});

const InventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: [true, 'Quantity is required'] },
  inStock: { type: Boolean, required: [true, 'InStock is required'] },
});

const productSchema = new Schema<IProduct>({
  name: { type: String, required: [true, 'Product name is required'] },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: { type: Number, required: [true, 'Price is required'] },
  category: { type: String, required: [true, 'Category is required'] },
  tags: { type: [String], required: [true, 'Tags are required'] },
  variants: {
    type: [VariantsSchema],
    required: [true, 'Variants are required'],
  },
  inventory: {
    type: InventorySchema,
    required: [true, 'Inventory is required'],
  },
});
productSchema.pre('save', function (next) {
  if (this.inventory.quantity === 0) {
    this.inventory.inStock = false;
  } else {
    this.inventory.inStock = true;
  }
  next();
});

const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;
