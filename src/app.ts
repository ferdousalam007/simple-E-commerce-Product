import express, { Application } from 'express';
import { Request, Response } from 'express';
import { ProductRouter } from './app/module/product/product.route';
const app: Application = express()

app.use(express.json());

app.use('/api/products',ProductRouter)


app.get('/', (req: Request, res: Response) => {

    res.send('Hello World!')
})

export default app;
