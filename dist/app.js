"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/module/product/product.route");
const order_route_1 = require("./app/module/order-management/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/products', product_route_1.ProductRouter);
app.use('/api/orders', order_route_1.orderRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
