"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const router = express_1.default.Router();
router.get("/dash", controller_1.Controller.dash);
router.get("/suppliers", controller_1.Controller.suppliers);
router.get("/suppliers/:supplierId", controller_1.Controller.suppliersIndexed);
router.get("/products", controller_1.Controller.products);
router.get("/products/:productId", controller_1.Controller.productsIndexed);
router.get("/orders", controller_1.Controller.orders);
router.get("/orders/:orderId", controller_1.Controller.ordersIndexed);
router.get("/employees", controller_1.Controller.employees);
router.get("/employees/:employeeId", controller_1.Controller.employeesIndexed);
router.get("/customers", controller_1.Controller.customers);
router.get("/customers/:customerId", controller_1.Controller.customersIndexed);
router.get("/search-products/:keyword", controller_1.Controller.searchProducts);
router.get("/search-customers/:keyword", controller_1.Controller.searchCustomers);
exports.default = router;
