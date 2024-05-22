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
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const InventorySchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative(),
  inStock: z.boolean(),
});

const productValidationWithZodSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z
    .number()
    .positive()
    .min(0, { message: 'Product price must be a positive number' }),
  category: z.string().min(1, { message: 'Product category is required' }),
  tags: z.array(z.string()).min(1, { message: 'Product tags are required' }),
  variants: z.array(VariantsSchema),
  inventory: InventorySchema,
});
export default productValidationWithZodSchema;
