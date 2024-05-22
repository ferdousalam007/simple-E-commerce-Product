"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary modules from Express
const express_1 = __importDefault(require("express"));
// Importing the router for product-related routes
const product_route_1 = require("./app/module/product/product.route");
// Importing the router for order-related routes
const order_route_1 = require("./app/module/order-management/order.route");
// Creating an instance of the Express application
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Mounting the product router at '/api/products'
app.use('/api/products', product_route_1.ProductRouter);
// Mounting the order router at '/api/orders'
app.use('/api/orders', order_route_1.orderRouter);
// Route handler for the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Error handling middleware for 404 Not Found errors
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
// Exporting the configured Express application
exports.default = app;
