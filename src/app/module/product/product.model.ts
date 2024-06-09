// Importing necessary functions from mongoose for defining schemas and models
import { Schema, model } from 'mongoose';
// Importing interfaces and other custom types used in the schema definition
import { IProduct, Inventory } from './product.interface';

const productSchema = new Schema<IProduct>({
  name: { type: String, required: [true, 'Product name is required'] },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: { type: Number, required: [true, 'Price is required'] },
  category: { type: String, required: [true, 'Category is required'] },
  tags: { type: [String], required: [true, 'Tags are required'] },
  variants: [{
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }],
  inventory: {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
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
