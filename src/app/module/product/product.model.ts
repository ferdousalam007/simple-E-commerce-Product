// Importing necessary functions from mongoose for defining schemas and models
import { Schema, model } from 'mongoose';

// Importing interfaces and other custom types used in the schema definition
import { IProduct, Inventory, Variants } from './product.interface';

// Defining the schema for product variants
const VariantsSchema = new Schema<Variants>({
  // Each variant must have a type and a value, both of which are required
  type: { type: String, required: [true, 'type is required'] },
  value: { type: String, required: [true, 'value is required'] },
});

// Defining the schema for product inventory details
const InventorySchema = new Schema<Inventory>({
  // Quantity and inStock status are required for inventory management
  quantity: { type: Number, required: [true, 'Quantity is required'] },
  inStock: { type: Boolean, required: [true, 'InStock is required'] },
});

// Main product schema combining all necessary fields and validations
const productSchema = new Schema<IProduct>({
  // Basic product information like name, description, price, and category
  name: { type: String, required: [true, 'Product name is required'] },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: { type: Number, required: [true, 'Price is required'] },
  category: { type: String, required: [true, 'Category is required'] },
  tags: { type: [String], required: [true, 'Tags are required'] },
  // Array of product variants, each defined by the VariantsSchema
  variants: {
    type: [VariantsSchema],
    required: [true, 'Variants are required'],
  },
  // Inventory details for the product, defined by the InventorySchema
  inventory: {
    type: InventorySchema,
    required: [true, 'Inventory is required'],
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