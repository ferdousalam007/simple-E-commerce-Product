import express, { Application, NextFunction } from 'express';
import { Request, Response } from 'express';
import { ProductRouter } from './app/module/product/product.route';
import { orderRouter } from './app/module/order-management/order.route';
const app: Application = express();

app.use(express.json());

app.use('/api/products', ProductRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
export default app;
