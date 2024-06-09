import * as z from 'zod';

export type Variants = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};

const VariantsSchema = z.object({
  type: z.string({ required_error: "type is required", invalid_type_error: "type must be a string", }),
  value: z.string({ required_error: "value is required", invalid_type_error: "value must be a string", })
});

const InventorySchema = z.object({
  quantity: z.number({ required_error: "Quantity is required", invalid_type_error: "Quantity must be a number", }).int().nonnegative('Quantity must be a positive number'),
  inStock: z.boolean(),
});

const productValidationWithZodSchema = z.object({
  name: z.string({ required_error: "name is required", invalid_type_error: "name must be a string", }),
  description: z
    .string({ required_error: "product description is required", invalid_type_error: "product description must be a string", }),

  price: z
    .number({ required_error: "price is required", invalid_type_error: "price must be a number", })
    .positive()
    .min(0, { message: 'Product price must be a positive number' }),
  category: z.string({ required_error: "category  is required", invalid_type_error: "category  must be a string", }).min(1, { message: 'Product category is required' }),
  tags: z.array(z.string({ required_error: "tags  is required", invalid_type_error: "tags  must be a array of string", })).min(1, { message: 'Product tags are required' }),
  variants: z.array(VariantsSchema),
  inventory: InventorySchema,
});
export default productValidationWithZodSchema;
