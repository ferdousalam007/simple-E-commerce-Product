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
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),
  productId: z
    .string({
      required_error: 'Product ID is required',
      invalid_type_error: 'Product ID must be a string',
    })
    .min(1, { message: 'Product ID is required' }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .int()
    .positive({ message: 'Quantity must be a positive number' }),
});

export default orederValidationWithZodSchema;
