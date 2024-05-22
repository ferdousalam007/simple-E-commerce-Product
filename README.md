## Running the Application Locally

To run the application locally, follow these steps:

### Prerequisites
- Ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- MongoDB should be running on your local machine or accessible via a network connection.

### Setup
1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies:
   ```bash
   npm install
   ```

### Configuration
Create a `.env` file in the root directory of the project and add the following environment variables:
```plaintext
PORT=5000
DATABASE_URL=mongodb+srv://<your database admin>:<your password>@cluster0.nzfdfvp.mongodb.net/simple-product?retryWrites=true&w=majority&appName=Cluster0

```
Make sure to replace `yourDatabaseName` with the name of your MongoDB database.

### Running the Application
- To run the application in development mode, use the following command:
  ```bash
  npm run start:dev
  ```
- To run the application in production mode, first build the project:
  ```bash
  npm run build
  ```
  Then start the application:
  ```bash
  npm run start:prod
  ```

### Accessing the Application
Once the application is running, you can access it by navigating to `http://localhost:3000` in your web browser. The default route will display "Hello World!" as set up in the `src/app.ts` file.


```12:14:src/app.ts
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
```


For further details on the available API endpoints, refer to the routes defined in the `product.route.ts` and `order.route.ts` files.


```1:12:src/app/module/product/product.route.ts
import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

//
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getProductById);
router.delete('/:productId', ProductController.deleteProductById);
router.put('/:productId', ProductController.updateProductById);

export const ProductRouter = router;
```



```1:8:src/app/module/order-management/order.route.ts
import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);

export const orderRouter = router;
```


This should help you get the application running locally on your machine.