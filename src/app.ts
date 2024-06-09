// Importing necessary modules from Express
import express, { Application } from 'express';
import { Request, Response } from 'express';

// Importing the router for product-related routes
import { ProductRouter } from './app/module/product/product.route';

// Importing the router for order-related routes
import { orderRouter } from './app/module/order-management/order.route';

// Creating an instance of the Express application
const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mounting the product router at '/api/products'
app.use('/api/products', ProductRouter);

// Mounting the order router at '/api/orders'
app.use('/api/orders', orderRouter);

// Route handler for the root URL ('/')
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome simple ecommerce app');
});

// Error handling middleware for 404 Not Found errors
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Exporting the configured Express application
export default app;
