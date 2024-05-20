import express, { Application } from 'express';
import { Request, Response } from 'express';
const app: Application = express()
const port = 3000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    var a =1;
    res.send('Hello World!')
})

export default app;
