import * as z from 'zod';

export type IOrderItem = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};
export type Iemail = {
  email: string;
};
export const emailValidationWithZod = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
const orederValidationWithZodSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive number' }),
});

export default orederValidationWithZodSchema;
